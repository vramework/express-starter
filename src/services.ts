import {
  VrameworkSessionService,
  JoseJWTService,
} from '@vramework/services-local'
import { ConsoleLogger, CreateSessionServices, CreateSingletonServices } from '@vramework/core'

import { Config, Services, SingletonServices, UserSession } from './api'
import { BookService } from './book.service'

export const createSingletonServices: CreateSingletonServices<Config, SingletonServices> = async (
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

  const sessionService = new VrameworkSessionService<UserSession>(jwt, {})

  return {
    config,
    logger,
    jwt,
    sessionService,
    books: new BookService(),
  }
}

export const createSessionServices: CreateSessionServices<SingletonServices, UserSession, Services> = async (
  singletonServices,
  _session
) => {
  return {
    ...singletonServices,
  }
}
