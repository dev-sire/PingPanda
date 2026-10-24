"use client"

import { SignIn } from "@clerk/nextjs";
import { useSearchParams } from "next/navigation";
import { AuthBackdrop, authAppearance } from "@/components/auth-backdrop";

const Page = () => {

    const searchParams = useSearchParams()
    const intent = searchParams.get("intent")

    return(
        <AuthBackdrop>
            <SignIn
                appearance={authAppearance}
                forceRedirectUrl={intent ? `/dashboard?intent=${intent}` : "/dashboard"}
            />
        </AuthBackdrop>
    )
}

export default Page;