import { initializeVrameworkCore } from '@vramework/core/initialize'

import { Server } from 'http'
import * as express from 'express'
import * as core from 'express-serve-static-core'
import { json } from 'body-parser'
import * as cookieParser from 'cookie-parser'

import { ConsoleLogger, getVrameworkConfig } from '@vramework/core'
import { vrameworkMiddleware } from '@vramework/express-middleware'
import { config } from '../src/config'
import { createSessionServices, createSingletonServices } from '../src/services'
import '../generated/routes'
import '../generated/schemas'

export class ExpressServer {
  public app: core.Express = express()
  public logger: ConsoleLogger
  public server: Server | undefined

  constructor(private vrameworkConfigFile?: string) {
    this.logger = new ConsoleLogger()
  }

  private async addVrameworkMiddleware() {
    const vrameworkConfig = await getVrameworkConfig(this.vrameworkConfigFile)
    const singletonServices = await createSingletonServices(config, this.logger)
    
    await initializeVrameworkCore(
      this.logger,
      vrameworkConfig
    )

    this.app.use(vrameworkMiddleware(singletonServices, createSessionServices, {
      set404Status: false,
    }))
  }

  public async start() {
    this.app.use(json())
    this.app.use(cookieParser())

    this.app.get('/health-check', (_req, res) => {
        res.status(200).json({ status: 'ok' })
    })

    await this.addVrameworkMiddleware()

    this.server = this.app.listen(config.port, config.hostname, () => {
      this.logger.info(`listening on port ${config.port} and host: ${config.hostname}`)
    })
  }
}
