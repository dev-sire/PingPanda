export type DeliveryFailure = {
    code: string
    message: string
    httpStatus: number
}

/**
 * Maps raw Discord API errors to stable, developer-facing error codes.
 * Raw Discord messages are never exposed (they can leak internals);
 * they are logged server-side instead.
 */
export const classifyDiscordError = (error: unknown): DeliveryFailure => {
    const e = error as { status?: number; code?: number }

    switch (e?.code) {
        case 50007:
            return {
                code: "DM_BLOCKED",
                httpStatus: 403,
                message:
                    "Discord refused the DM. The user must join the PingPanda Discord server and allow direct messages from server members.",
            }
        case 10013:
            return {
                code: "UNKNOWN_DISCORD_USER",
                httpStatus: 404,
                message:
                    "No Discord user exists with the saved Discord ID. Check the ID in Account Settings.",
            }
        case 40003:
            return {
                code: "DISCORD_RATE_LIMITED",
                httpStatus: 429,
                message: "Discord is rate limiting DMs to this user. Retry shortly.",
            }
    }

    if (e?.status === 401) {
        return {
            code: "BOT_MISCONFIGURED",
            httpStatus: 502,
            message: "PingPanda's Discord bot is not configured correctly. Contact support.",
        }
    }

    return {
        code: "DELIVERY_FAILED",
        httpStatus: 502,
        message: "Discord delivery failed unexpectedly. Try again later.",
    }
}
