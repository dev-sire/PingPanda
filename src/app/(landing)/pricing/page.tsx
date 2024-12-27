"use client"

import { Heading } from "@/components/heading";
import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { client } from "@/lib/client";
import { useUser } from "@clerk/nextjs";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

const Page = () => {

    const { user } = useUser()
    const router = useRouter()

    const INCLUDED_FEATURES = [
        "10,000 real-time events per month",
        "10 event categories per month",
        "Advanced analytics and insights",
        "Priority support"
    ]

    const { mutate: createCheckoutSession } = useMutation({
        mutationFn: async () => {
            const res = await client.payment.createCheckoutSession.$post()
            return await res.json()
        },
        onSuccess: ({ url }) => {
            if(url) router.push(url)
        },
    })

    const handleGetAccess = () => {
        if(user){
            createCheckoutSession()
        } else{
            router.push("/sign-in?intent=upgrade")
        }
    }

    return(
        <div className="bg-brand-25 py-24 sm:py-32">
            <MaxWidthWrapper>
                <div className="flex flex-col items-center mx-auto max-w-2xl text-center">
                    <Heading className="text-center">Simple no-tricks pricing</Heading>
                    <p className="mt-6 text-base/7 text-gray-600 max-w-prose text-center text-pretty">
                        We hate subscriptions, and chances are, you do too. That&apos;s why we offer lifetime access to PingPanda for a one-time payment.
                    </p>
                </div>
                <div className="bg-white mx-auto mt-16 max-w-2xl rounded-2xl ring-1 ring-gray-200 sm:mt-20 lg:mx-0 lg:flex lg:max-w-none">
                    <div className="p-8 sm:p-10 lg:flex-auto">
                        <h3 className="text-3xl font-heading font-semibold tracking-tight text-gray-900">
                            Lifetime access
                        </h3>
                        <p className="mt-6 text-base/7 text-gray-600">
                            Invest once in PingPanda and transform how you monitor your SaaS forever. Get instant alerts, track critical metrics and never miss a beat in your business growth.  
                        </p>
                    </div>
                </div>
            </MaxWidthWrapper>
        </div>
    )
}

export default Page;