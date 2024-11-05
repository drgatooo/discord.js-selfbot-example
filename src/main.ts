import { loadConfig, streamAudio, streamVideo } from '@/utils'
import { Client } from 'discord.js-selfbot-v13'
import { handleCall } from './handleCall';
import { MUSIC_PATH, VIDEO_PATH } from './constants';

async function main(): Promise<void> {
  console.log('Hello friend...')

  const config = await loadConfig('./config/config.yml')

  const client = new Client();

  client.on('ready', async () => {
    console.log('Ready!');
    client.user?.setSamsungActivity(config.gameId, 'START');
  });

  client.on('debug', console.log)

  client.on('messageCreate', async (message) => {
    if (message.channel.type !== "DM" || message.channel.recipient.id !== config.recipientId) return
    if (message.content === "otinianos unidos") await handleCall(client, config)
    if (message.content === "!momazos") {
      if (!client.voice.connection) {
        void message.reply({
          content: 'ERR! Not in a voice channel.'
        })
        return
      }
      await streamVideo(client.voice.connection, VIDEO_PATH)
    }
    if (message.content === "!music") {
      if (!client.voice.connection) {
        void message.reply({
          content: 'ERR! Not in a voice channel.'
        })
        return
      }
      await streamAudio(client.voice.connection, MUSIC_PATH)
    }
  })

  client.login(config.token)
    .then(() => console.log('\n\n:3'))
}

void main()
