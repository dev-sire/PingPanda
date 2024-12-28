"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { client } from "@/lib/client"
import { useMutation } from "@tanstack/react-query"
import Link from "next/link"
import { useState } from "react"

export const AccountSettings = ({
    discordId: initialDiscordId,
}: {
    discordId: string
}) => {
    const [discordId, setDiscordId] = useState(initialDiscordId)

    const { mutate, isPending } = useMutation({
        mutationFn: async (discordId: string) => {
            const res = await client.project.setDiscordId.$post({ discordId })
            return await res.json()
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

            <div className="pt-4">
                <Button onClick={() => mutate(discordId)} disabled={isPending}>
                    {isPending ? "Saving..." : "Save Changes"}
                </Button>
            </div>
        </Card>
    )
}