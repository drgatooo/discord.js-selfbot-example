import { Client } from "discord.js-selfbot-v13";
import { Config } from "./types/configSchema";

export async function handleCall(client: Client<true>, config: Config): Promise<void> {
    const user = await client.users.fetch(config.recipientId).catch(() => null)

    if (!user) {
        console.log('error al encontrar usuario :,v')
        process.exit(1)
    }

    console.log('Calling...')

    const dm = await user.createDM().catch(() => null)

    if (!dm) {
        console.log('error al crear dm :,v')
        process.exit(1)
    }

    client.voice.joinChannel(dm, {
        selfDeaf: false,
        selfMute: false,
        selfVideo: true,
        videoCodec: 'H264'
    })
        .then(async (conn) => {
            console.log('conectado :3')
        })
        .catch((err) => {
            console.log(err)
            console.log('\n\nerror al conectarse :,v')
            process.exit(1)
        })

    setInterval(async () => {
        if (!client.voice.connection) {
            await client.voice.joinChannel(dm, {
                selfDeaf: true,
                selfMute: true
            })
                .then(() => console.log('conectado :3'))
                .catch(() => {
                    console.log('error al conectarse :,v reintentando en un minuto')
                    process.exit(1)
                })
        }
    }, 60000);
}