import { CreateSessionServices, CreateSingletonServices, Logger, VrameworkSessionService } from '@vramework/core'
import { JoseJWTService } from '@vramework/jose'
import { Config, Services, SingletonServices, UserSession } from './api'
import { BookService } from './book.service'

export const createSingletonServices: CreateSingletonServices<Config, SingletonServices> = async (
  config: Config,
  logger: Logger
): Promise<SingletonServices> => {
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
