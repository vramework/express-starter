import {
  VrameworkSessionService,
  JoseJWTService,
} from '@vramework/services-local'
import { ConsoleLogger } from '@vramework/core/services'
import { Config, SingletonServices, UserSession } from './api'
import { BookService } from './book.service'
import { CreateSessionServices } from '@vramework/core/types'

export const createSingletonServices = async (
  config: Config
): Promise<SingletonServices> => {
  const logger = new ConsoleLogger()

  if (config.logLevel) {
    logger.setLevel(config.logLevel)
  }

  const jwt = new JoseJWTService<UserSession>(
    async () => [
      {
        id: 'my-key',
        value: 'the-yellow-puppet',
      },
    ],
    logger
  )

  const sessionService = new VrameworkSessionService(jwt, {})

  return {
    config,
    logger,
    jwt,
    sessionService,
    books: new BookService(),
  }
}

export const createSessionServices: CreateSessionServices = async (
  singletonServices,
  _session
) => {
  return {
    ...singletonServices,
  }
}
