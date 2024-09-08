import { getVrameworkConfig } from '@vramework/core/vramework-config'
import { 
  ExpressServer, 
  ExpressHTTPRequestService, 
  CreateExpressHTTPSessionServices
} from '@vramework/deploy-express'

import { config } from '../src/config'
import { createSingletonServices } from '../src/services'

export const createSessionServices: CreateExpressHTTPSessionServices = async (singletonServices, _session, { req, res }) => {
  return {
    ...singletonServices,
    httpRequest: new ExpressHTTPRequestService(req, res)
  }
}

async function main ({ configFile }: { configFile?: string }): Promise<void> {
  try {
    const vrameworkConfig = await getVrameworkConfig(configFile)
    const services = await createSingletonServices(config)

    const appServer = new ExpressServer(
      vrameworkConfig,
      config, 
      services,
      createSessionServices,
    )

    appServer.init().then(async () => {
        await appServer.start()
    })

    process.removeAllListeners('SIGINT').on('SIGINT', async () => {
        services.logger.info('stopping server')
      await appServer.stop()
      process.exit(0)
    })
  } catch (e: any) {
    console.error(e.toString())
    process.exit(1)
  }
}

main({
  configFile: process.argv[2]
})