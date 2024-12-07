import { DashboardPage } from "@/components/dashboard-page";
import { db } from "@/db";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { DashboardPageContent } from "./dashboard-page-content";
import { CreateEventCategoryModal } from "@/components/create-event-category-modal";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";

const Page = async () => {

    const auth = await currentUser()

    if(!auth){
        redirect("/sign-in")
    }

    const user = await db.user.findUnique({
        where: { externalId: auth.id }
    })

    if(!user){
        redirect("/sign-in")
    }

    return(
        <DashboardPage cta={
            <CreateEventCategoryModal>
                <Button>
                    <PlusIcon className="size-4 mr-2" />Add Category
                </Button>
            </CreateEventCategoryModal>
        } title="Dashboard">
            <DashboardPageContent />
        </DashboardPage>
    )
}
export default Page;