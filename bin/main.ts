import '../generated/routes'
import '../generated/schemas'

import { getVrameworkConfig } from '@vramework/core/vramework-config'
import { VrameworkExpressServer } from '@vramework/deploy-express'

import { config } from '../src/config'
import { createSessionServices, createSingletonServices } from '../src/services'

async function main({ configFile }: { configFile?: string }): Promise<void> {
  try {
    const vrameworkConfig = await getVrameworkConfig(configFile)
    const singletonServices = await createSingletonServices(config)
    const expressServer = new VrameworkExpressServer(
      vrameworkConfig,
      config,
      singletonServices,
      createSessionServices
    )
    expressServer.enableExitOnSigInt()
    await expressServer.init()
    await expressServer.start()
  } catch (e: any) {
    console.error(e.toString())
    process.exit(1)
  }
}

main({
  configFile: process.argv[2],
})
