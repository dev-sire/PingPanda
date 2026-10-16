import { addMonths, startOfMonth } from "date-fns";
import { router } from "../__internals/router";
import { privateProcedure } from "../procedures";
import { db } from "@/db";
import { FREE_QUOTA, PRO_QUOTA } from "@/config";
import { z } from "zod";
import { DiscordClient } from "@/lib/discord-client";

export const projectRouter = router({
    getUsage: privateProcedure.query(async ({ c, ctx }) => {
        const {user} = ctx

        const currentDate = startOfMonth(new Date())

        const quota = await db.quota.findFirst({
            where: {    
                userId: user.id,
                year: currentDate.getFullYear(),
                month: currentDate.getMonth() + 1,
            },
        })

        const eventCount = quota?.count ?? 0

        const categoryCount = await db.eventCategory.count({
            where: { userId: user.id },
        })

        const limits = user.plan === "PRO" ? PRO_QUOTA : FREE_QUOTA
        const resetDate = addMonths(currentDate, 1)

        return c.superjson({
            categoriesUsed: categoryCount,
            categoriesLimit: limits.maxEventCategories,
            eventsUsed: eventCount,
            eventsLimit: limits.maxEventsPerMonth,
            resetDate,
        })
    }),
    setDiscordId: privateProcedure.input(
        z.object({ discordId: z.string().max(32) })
    ).mutation(async ({ c, ctx, input }) => {
        const { user } = ctx
        const discordId = input.discordId.trim()

        // Same shape on every return so the client can narrow the union safely
        const result = (r: {
            success: boolean
            code?: string
            message?: string
            inServer?: boolean | null
        }) => ({
            success: r.success,
            code: r.code ?? null,
            message: r.message ?? null,
            inServer: r.inServer ?? null,
            inviteUrl: process.env.NEXT_PUBLIC_DISCORD_INVITE_URL ?? null,
        })

        // Discord IDs ("snowflakes") are 17-20 digit numbers
        if (!/^\d{17,20}$/.test(discordId)) {
            return c.json(result({
                success: false,
                code: "INVALID_DISCORD_ID",
                message: "That doesn't look like a Discord ID. It should be a 17-20 digit number, not your username.",
            }), 400)
        }

        await db.user.update({
            where: { id: user.id },
            data: { discordId }
        })

        const guildId = process.env.DISCORD_GUILD_ID

        if (!guildId) {
            return c.json(result({ success: true, inServer: null }))
        }

        try {
            const discord = new DiscordClient(process.env.DISCORD_BOT_TOKEN)
            const inServer = await discord.isGuildMember(guildId, discordId)
            return c.json(result({ success: true, inServer }))
        } catch (error) {
            console.error("[setDiscordId] membership check failed", error)
            return c.json(result({ success: true, inServer: null }))
        }
    }),
    getDiscordStatus: privateProcedure.query(async ({ c, ctx }) => {
        const { user } = ctx
        const inviteUrl = process.env.NEXT_PUBLIC_DISCORD_INVITE_URL ?? null
        const guildId = process.env.DISCORD_GUILD_ID

        if (!user.discordId) {
            return c.json({ status: "NO_ID" as string, inviteUrl })
        }

        if (!guildId) {
            return c.json({ status: "UNKNOWN" as string, inviteUrl })
        }

        try {
            const discord = new DiscordClient(process.env.DISCORD_BOT_TOKEN)
            const inServer = await discord.isGuildMember(guildId, user.discordId)
            return c.json({ status: (inServer ? "OK" : "NOT_IN_SERVER") as string, inviteUrl })
        } catch (error) {
            console.error("[getDiscordStatus] membership check failed", error)
            return c.json({ status: "UNKNOWN" as string, inviteUrl })
        }
    })
})
