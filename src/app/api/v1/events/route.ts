import { FREE_QUOTA, PRO_QUOTA } from "@/config";
import { db } from "@/db";
import { DiscordClient } from "@/lib/discord-client";
import { classifyDiscordError, DeliveryFailure } from "@/lib/discord-errors";
import { CATEGORY_NAME_VALIDATOR } from "@/lib/validators/category-validator";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const REQUEST_VALIDATOR = z.object({
    category: CATEGORY_NAME_VALIDATOR,
    fields: z.record(z.string().or(z.number()).or(z.boolean())).optional(),
    description: z.string().optional()
}).strict()

/**
 * Every error response has the same shape so integrators can handle it in code:
 * { message: string, code: string, ...extras }
 */
const fail = (
    status: number,
    code: string,
    message: string,
    extra: Record<string, unknown> = {}
) => NextResponse.json({ message, code, ...extra }, { status })

export const POST = async (req: NextRequest) => {
    try {
        const authHeader = req.headers.get("Authorization")

        if (!authHeader) {
            return fail(401, "MISSING_AUTH_HEADER", "Missing Authorization header. Expected: 'Bearer [API_KEY]'")
        }

        if (!authHeader.startsWith("Bearer ")) {
            return fail(401, "INVALID_AUTH_FORMAT", "Invalid auth header format. Expected: 'Bearer [API_KEY]'")
        }

        const apiKey = authHeader.split(" ")[1]

        if (!apiKey || apiKey.trim() === "") {
            return fail(401, "INVALID_API_KEY", "Invalid API key")
        }

        const user = await db.user.findUnique({
            where: { apiKey },
            include: { EventCategories: true },
        })

        if (!user) {
            return fail(401, "INVALID_API_KEY", "Invalid API key")
        }

        if (!user.discordId) {
            return fail(403, "DISCORD_ID_MISSING", "Please enter your Discord ID in your account settings.")
        }

        // Actual logic after checking the validity of user and API key

        const currentDate = new Date()
        const currentMonth = currentDate.getMonth() + 1
        const currentYear = currentDate.getFullYear()

        const quota = await db.quota.findUnique({
            where: {
                userId: user.id,
                month: currentMonth,
                year: currentYear,
            },
        })

        const quotaLimit = user.plan === "FREE" ? FREE_QUOTA.maxEventsPerMonth : PRO_QUOTA.maxEventsPerMonth

        if (quota && quota.count >= quotaLimit) {
            return fail(429, "QUOTA_EXCEEDED", "Monthly quota reached. Please upgrade your plan for more events.")
        }

        let requestData: unknown

        try {
            requestData = await req.json()
        } catch (error) {
            return fail(400, "INVALID_JSON", "Invalid JSON request body")
        }

        const parsed = REQUEST_VALIDATOR.safeParse(requestData)

        if (!parsed.success) {
            return fail(422, "VALIDATION_ERROR", "Request body failed validation.", {
                issues: parsed.error.issues.map((issue) => ({
                    path: issue.path.join("."),
                    message: issue.message,
                })),
            })
        }

        const validationResults = parsed.data

        const category = user.EventCategories.find(
            (cat) => cat.name === validationResults.category
        )

        if (!category) {
            return fail(404, "CATEGORY_NOT_FOUND", `You have no category named ${validationResults.category}`)
        }

        const eventData = {
            title: `${category.emoji || "🔔"} ${category.name.charAt(0).toUpperCase() + category.name.slice(1)}`,
            description: validationResults.description || `A new ${category.name} event occurred!`,
            color: category.color,
            timestamp: new Date().toISOString(),
            fields: Object.entries(validationResults.fields || {}).map(
                ([key, value]) => {
                    return {
                        name: key,
                        value: String(value),
                        inline: true,
                    }
                }
            )
        }

        const event = await db.event.create({
            data: {
                name: category.name,
                formattedMessage: `${eventData.title}\n\n${eventData.description}`,
                userId: user.id,
                fields: validationResults.fields || {},
                eventCategoryId: category.id
            }
        })

        // Only Discord calls are inside this try, so a database hiccup
        // can never mislabel a delivered message as FAILED.
        const discord = new DiscordClient(process.env.DISCORD_BOT_TOKEN)
        let failure: DeliveryFailure | null = null

        try {
            const dmChannel = await discord.createDM(user.discordId)
            await discord.sendEmbed(dmChannel.id, eventData)
        } catch (error) {
            failure = classifyDiscordError(error)
            console.error(`[events] delivery failed for event ${event.id} (${failure.code})`, error)
        }

        if (failure) {
            await db.event.update({
                where: { id: event.id },
                data: {
                    deliveryStatus: "FAILED",
                    errorCode: failure.code,
                    deliveryError: failure.message,
                }
            })

            return fail(failure.httpStatus, failure.code, failure.message, { eventId: event.id })
        }

        await db.event.update({
            where: { id: event.id },
            data: { deliveryStatus: "DELIVERED" }
        })

        await db.quota.upsert({
            where: { userId: user.id, month: currentMonth, year: currentYear },
            update: { count: { increment: 1 } },
            create: {
                userId: user.id,
                month: currentMonth,
                year: currentYear,
                count: 1
            }
        })

        return NextResponse.json({
            message: "Event processed successfully",
            eventId: event.id,
        })
    } catch (error) {
        console.error(error)
        return fail(500, "INTERNAL_ERROR", "Internal Server Error")
    }
}
