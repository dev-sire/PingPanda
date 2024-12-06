import { db } from "@/db";
import { router } from "../__internals/router";
import { privateProcedure } from "../procedures";
import { startOfMonth } from "date-fns";
import { z } from "zod";

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
    })
})