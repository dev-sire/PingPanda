"use client"

import { EventCategory } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

interface CategoryPageContentProps {
    hasEvents: boolean;
    category: EventCategory;
}

export const CategoryPageContent = ({ hasEvents: initialHasEvents, category }: CategoryPageContentProps) => {

    const { data: pollingData } = useQuery({
        queryKey: ["category", category.name, "hasEvents"],
        initialData: { hasEvents: initialHasEvents },
    })

    return(
        <div className="">
        
        </div>
    )
}