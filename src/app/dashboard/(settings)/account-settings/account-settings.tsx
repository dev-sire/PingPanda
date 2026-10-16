"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { client } from "@/lib/client"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import Link from "next/link"
import { useState } from "react"

export const AccountSettings = ({
    discordId: initialDiscordId,
}: {
    discordId: string
}) => {
    const [discordId, setDiscordId] = useState(initialDiscordId)
    const queryClient = useQueryClient()

    const { mutate, isPending, data } = useMutation({
        mutationFn: async (discordId: string) => {
            const res = await client.project.setDiscordId.$post({ discordId })
            return await res.json()
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["discord-status"] })
        },
    })

    return (
        <Card className="max-w-xl w-full space-y-4">
            <div className="pt-2">
                <Label>Discord ID</Label>
                <Input
                    className="mt-1"
                    value={discordId}
                    onChange={(e) => setDiscordId(e.target.value)}
                    placeholder="Enter your Discord ID"
                />
            </div>

            <p className="mt-2 text-sm/6 text-gray-600">
                Don't know how to find your Discord ID?{" "}
                <Link href="#" className="text-brand-600 hover:text-brand-500">
                    Learn how to obtain it here
                </Link>
                .
            </p>

            {data && !data.success ? (
                <p className="text-sm/6 text-red-600">{data.message}</p>
            ) : null}

            {data?.success && data.inServer === false ? (
                <div className="rounded-md border border-amber-300 bg-amber-50 p-3 text-sm/6 text-amber-900">
                    Saved, but this account isn't in the PingPanda Discord server yet. Notifications
                    can't be delivered until you join.
                    {data.inviteUrl ? (
                        <>
                            {" "}
                            <a
                                href={data.inviteUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-medium underline"
                            >
                                Join the server
                            </a>
                            , then come back to this page.
                        </>
                    ) : null}
                </div>
            ) : null}

            {data?.success && data.inServer === true ? (
                <p className="text-sm/6 text-green-700">Saved. Your account is in the PingPanda server.</p>
            ) : null}

            {data?.success && data.inServer === null ? (
                <p className="text-sm/6 text-gray-600">Saved.</p>
            ) : null}

            <div className="pt-4">
                <Button onClick={() => mutate(discordId)} disabled={isPending}>
                    {isPending ? "Saving..." : "Save Changes"}
                </Button>
            </div>
        </Card>
    )
}
