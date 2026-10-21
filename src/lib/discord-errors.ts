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
        case 50278:
            return {
                code: "USER_NOT_IN_SERVER",
                httpStatus: 403,
                message:
                    "Discord can't DM this user because they share no server with the PingPanda bot. The user must join the PingPanda Discord server.",
            }
        case 50007:
            return {
                code: "DMS_CLOSED",
                httpStatus: 403,
                message:
                    "The user has direct messages from server members turned off. They must allow DMs from the PingPanda server in their Discord privacy settings.",
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