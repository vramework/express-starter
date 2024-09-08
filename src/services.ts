import { ConsoleLogger } from '@vramework/core/services/logger'
import { Config, SingletonServices } from './api'
import { BookService } from './book.service'

export const createSingletonServices = async (config: Config): Promise<SingletonServices> => {
  const logger = new ConsoleLogger()

  if (config.logLevel) {
    logger.setLevel(config.logLevel)
  }

  return {
    config,
    logger,
    books: new BookService()
  } 
}