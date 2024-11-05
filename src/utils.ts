import { readFile } from 'node:fs/promises'
import { parse as yamlParse } from 'yaml'

import type { Config } from '@/types/configSchema'
import type { VoiceConnection } from 'discord.js-selfbot-v13'

// Read the config.yml file and parse it as a Config object
export async function loadConfig(path = './config/config.yml'): Promise<Config> {
  const raw = await readFile(path, 'utf8')
  return yamlParse(raw) as Config
}

export function promisify<T, U>(fn: (arg: T) => U): (arg: T) => Promise<U> {
  return async (arg: T) => await new Promise((resolve, reject) => {
    try {
      resolve(fn(arg))
    } catch (error) {
      reject(error instanceof Error ? error : new Error(String(error)))
    }
  })
}

export async function streamAudio(conn: VoiceConnection, path: string) {
  const dispatcher = conn.playAudio(
    path,
    { volume: 0.5 }
  )

  dispatcher.on('start', () => {
    console.log('Playing audio ^^')
  })

  dispatcher.on('finish', () => {
    console.log('Stopped audio :v')
  })

  return dispatcher
}

export async function streamVideo(conn: VoiceConnection, path: string) {
  const videoDispatcher = conn.playVideo(
    path,
    { fps: 30 }
  )
  const audioDispatcher = streamAudio(conn, path)

  videoDispatcher.on('start', () => {
    console.log(`Playing video ^^`)
  })
  videoDispatcher.on('finish', () => {
    console.log(`Stopped video :v`)
  })

  return [videoDispatcher, audioDispatcher]
}
