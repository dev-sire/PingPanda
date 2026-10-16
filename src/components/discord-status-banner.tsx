"use client"

import { client } from "@/lib/client"
import { useQuery } from "@tanstack/react-query"
import Link from "next/link"

export const DiscordStatusBanner = () => {
    const { data } = useQuery({
        queryKey: ["discord-status"],
        queryFn: async () => {
            const res = await client.project.getDiscordStatus.$get()
            return await res.json()
        },
        staleTime: 60_000,
        refetchOnWindowFocus: true,
    })

    if (!data || data.status === "OK" || data.status === "UNKNOWN") return null

    return (
        <div className="mb-6 rounded-md border border-amber-300 bg-amber-50 p-4 text-sm/6 text-amber-900">
            {data.status === "NO_ID" ? (
                <>
                    Add your Discord ID in{" "}
                    <Link href="/dashboard/account-settings" className="font-medium underline">
                        Account Settings
                    </Link>{" "}
                    to start receiving notifications.
                </>
            ) : (
                <>
                    Your Discord account isn't in the PingPanda server, so notifications will fail to
                    deliver.{" "}
                    {data.inviteUrl ? (
                        <a
                            href={data.inviteUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-medium underline"
                        >
                            Join the server
                        </a>
                    ) : null}
                </>
            )}
        </div>
    )
}
