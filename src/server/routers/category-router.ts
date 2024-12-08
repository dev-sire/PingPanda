import { db } from "@/db";
import { router } from "../__internals/router";
import { privateProcedure } from "../procedures";
import { startOfMonth } from "date-fns";
import { z } from "zod";
import { CATEGORY_NAME_VALIDATOR } from "@/lib/validators/category-validator";
import { parseColor } from "@/utils";

export const categoryRouter = router({
    getEventCategories: privateProcedure.query(async ({c, ctx}) => {

        const categories = await db.eventCategory.findMany({
            where: { userId: ctx.user.id },
            select: {
                id: true,
                name: true,
                emoji: true,    
                color: true,
                updatedAt: true,
                createdAt: true,
            },
            orderBy: { updatedAt: "desc" },
        })

        const categoriesWithNames = await Promise.all(
            categories.map(async (category) => {
                const now = new Date()
                const firstDayOfMonth = startOfMonth(now)

                const [uniqueFieldCount, eventsCount, lastPing] = await Promise.all([
                    db.event.findMany({
                        where: {
                            EventCategory: { id: category.id },
                            createdAt: { gte: firstDayOfMonth }
                        },
                        select: { fields: true },
                        distinct: ["fields"],
                    }).then((events) => {
                        const fieldNames = new Set<string>();
                        events.forEach((event) => {
                            Object.keys(event.fields as object).forEach(
                                (fieldName) => {
                                    fieldNames.add(fieldName)
                            })
                        })
                        return fieldNames.size
                    }),
                    db.event.count({
                        where: { 
                            EventCategory: { id: category.id },
                            createdAt: { gte: firstDayOfMonth }, 
                        },
                    }),
                    db.event.findFirst({
                        where: { EventCategory: { id: category.id } },
                        orderBy: { createdAt: "desc" },
                        select: { createdAt: true }
                    })
                ])
                return {
                    ...category,
                    uniqueFieldCount,
                    eventsCount,
                    lastPing: lastPing?.createdAt || null
                }
            })
        )

        return c.superjson({ categories: categoriesWithNames })
    }),
    deleteCategory: privateProcedure.input(z.object({ name: z.string() })).mutation(async ({c, input, ctx}) => {

        const { name } = input

        await db.eventCategory.delete({
            where: { name_userId: { name, userId: ctx.user.id } }
        })

        return c.json({ success: true })
    }),
    createEventCategory: privateProcedure.input(z.object({
        name: CATEGORY_NAME_VALIDATOR,
        color: z.string().min(1, "Color is required").regex(/^#[0-9A-F]{6}$/i, "Invalid color format."),
        emoji: z.string().emoji("Invalid Emoji").optional()
    })).mutation(async ({ c, ctx, input }) => {

        const { user } = ctx
        const { name, color, emoji } = input

        // TODO: ADD PAID PLAN LOGIC

        const eventCategory = await db.eventCategory.create({
            data: {
                name: name.toLowerCase(),
                color: parseColor(color),
                emoji,
                userId: user.id
            }
        })

        return c.json({ eventCategory })
    }),
    insertQuickstartCategory: privateProcedure.mutation(async({ctx, c}) => {

        const categories = await db.eventCategory.createMany({
            data: [
                { name: "Bug", emoji: "🐛", color: 0xff6b6b },
                { name: "Sale", emoji: "💰", color: 0xffeb3b },
                { name: "Question", emoji: "🤔", color: 0x6cfce7 }
            ].map((category) => ({
                ...category,
                userId: ctx.user.id
            }))
        })

        return c.json({ success: true, count: categories.count })
    })
})