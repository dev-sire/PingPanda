"use client"

import { EventCategory } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { EmptyCategoryState } from "./empty-category-state";

interface CategoryPageContentProps {
    hasEvents: boolean;
    category: EventCategory;
}

export const CategoryPageContent = ({ hasEvents: initialHasEvents, category }: CategoryPageContentProps) => {

    const { data: pollingData } = useQuery({
        queryKey: ["category", category.name, "hasEvents"],
        initialData: { hasEvents: initialHasEvents },
    })

    if(!pollingData.hasEvents){
        return(
            <EmptyCategoryState categoryName={category.name} />
        )
    }

    return(
        <div className="">
        
        </div>
    )
}