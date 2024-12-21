"use client"

import { EventCategory } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { EmptyCategoryState } from "./empty-category-state";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { client } from "@/lib/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { BarChart } from "lucide-react";

interface CategoryPageContentProps {
    hasEvents: boolean;
    category: EventCategory;
}

export const CategoryPageContent = ({ hasEvents: initialHasEvents, category }: CategoryPageContentProps) => {

    // http://localhost:300/dashboard/sale?page=2&limit=20
    const searchParams = useSearchParams()
    const page = parseInt(searchParams.get("page") || "1", 10)
    const limit = parseInt(searchParams.get("limit") || "30", 10)

    const { data: pollingData } = useQuery({
        queryKey: ["category", category.name, "hasEvents"],
        initialData: { hasEvents: initialHasEvents },
    })

    const[pagination, setPagination] = useState({
        pageIndex: page - 1,
        pageSize: limit,
    })
    const[activeTab, setActiveTab] = useState<"today" | "week" | "month">("today")

    if(!pollingData.hasEvents){
        return(
            <EmptyCategoryState categoryName={category.name} />
        )
    }

    const {data, isFetching} = useQuery({
        queryKey: ["events", category.name, pagination.pageIndex, pagination.pageSize, activeTab],
        queryFn: async () => {
            const res = await client.category.getEventsByCategoryName.$get({
                name: category.name,
                page: pagination.pageIndex + 1,
                limit: pagination.pageSize,
                timeRange: activeTab,
            })
            return await res.json()
        },
        refetchOnWindowFocus: false,
        enabled: pollingData.hasEvents,
    })

    return(
        <div className="space-y-6">
            <Tabs 
                value={activeTab}
                onValueChange={(value) => {
                    setActiveTab(value as "today" | "week" | "month")
                }}
            >
                <TabsList className="mb-2">
                    <TabsTrigger value="today">Today</TabsTrigger>
                    <TabsTrigger value="week">This week</TabsTrigger>
                    <TabsTrigger value="month">This month</TabsTrigger>
                </TabsList>
                <TabsContent value={activeTab}>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
                        <Card className="border-2 border-brand-700">
                            <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <p className="text-sm/6 font-medium">Total Events</p>
                                <BarChart className="size-4 text-muted-foreground" />
                            </div>
                        </Card>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    )
}