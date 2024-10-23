import { ExpressServer } from '../src/server'

async function main({ configFile }: { configFile?: string }): Promise<void> {
  try {
    const expressServer = new ExpressServer(configFile)
    await expressServer.start()
  } catch (e: any) {
    console.error(e.toString())
    process.exit(1)
  }
}

main({
  configFile: process.argv[2],
})
