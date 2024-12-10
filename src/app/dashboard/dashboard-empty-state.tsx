import { CreateEventCategoryModal } from "@/components/create-event-category-modal"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { client } from "@/lib/client"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const DashboardEmptyState = () => {

    const queryClient = useQueryClient()

    const { mutate: insertQuickstartCategories, isPending: isInsertingQuickstartCategories } = useMutation({
        mutationFn: async() => {
            await client.category.insertQuickstartCategory.$post()
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["user-event-categories"] })
        }
    })

    return(
        <Card className="flex flex-col items-center justify-center rounded-2xl flex-1 text-center p-6">
            <div className="flex justify-center w-full">
                <img src="/brand-asset-wave.png" alt="n0 categories" className="size-48 -mt-24" />
            </div>
            <h1 className="mt-2 text-xl/8 font-medium tracking-tight text-gray-900">No Events Categories Yet</h1>
            <p className="text-sm/6 text-gray-600 max-w-prose mt-2 mb-8">
                Start tracking events by creating your first category.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                <Button 
                    variant="outline" 
                    className="flex items-center space-x-2 w-full sm:w-auto"
                    onClick={() => insertQuickstartCategories()}
                    disabled={isInsertingQuickstartCategories}
                >
                    <span>🚀</span>
                    <span>{isInsertingQuickstartCategories ? "Creating...": "Quickstart"}</span>
                </Button>
                <CreateEventCategoryModal containerClassName="w-full sm:w-auto">
                    <Button className="w-full flex items-center space-x-2 sm:w-auto">
                        <span>Add Category</span>
                    </Button>
                </CreateEventCategoryModal>
            </div>
        </Card>
    )
}