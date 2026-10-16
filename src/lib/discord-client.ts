import { REST } from "@discordjs/rest";
import {
    RESTPostAPIChannelMessageResult,
    RESTPostAPICurrentUserCreateDMChannelResult,
    Routes,
    APIEmbed
} from "discord-api-types/v10"

export class DiscordClient {
    private rest: REST

    constructor(token: string | undefined) {
        this.rest = new REST({ version: "10" }).setToken(token ?? "")
    }

    async createDM(userId: string): Promise<RESTPostAPICurrentUserCreateDMChannelResult> {
        return this.rest.post(Routes.userChannels(), {
            body: { recipient_id: userId },
        }) as Promise<RESTPostAPICurrentUserCreateDMChannelResult>
    }

    async isGuildMember(guildId: string, userId: string): Promise<boolean> {
        try {
            await this.rest.get(Routes.guildMember(guildId, userId))
            return true
        } catch (error) {
            // 404 / code 10007 = Unknown Member (user is not in the server)
            const e = error as { status?: number; code?: number }
            if (e?.status === 404 || e?.code === 10007 || e?.code === 10013) return false
            throw error
        }
    }

    async sendEmbed(channelId: string, embed: APIEmbed): Promise<RESTPostAPIChannelMessageResult> {
        return this.rest.post(Routes.channelMessages(channelId), {
            body: { embeds: [embed] }
        }) as Promise<RESTPostAPIChannelMessageResult>
    }
}