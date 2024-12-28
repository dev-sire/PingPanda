"use client"

import { SignIn } from "@clerk/nextjs";
import { useSearchParams } from "next/navigation";

const Page = () => {

    const searchParams = useSearchParams()
    const intent = searchParams.get("intent")

    return(
        <div className="w-full flex flex-1 items-center justify-center">
            <SignIn forceRedirectUrl={intent ? `/dashboard?intent=${intent}` : "/dashboard"} />
        </div>
    )
}

export default Page;