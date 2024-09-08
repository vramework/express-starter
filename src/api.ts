import { CoreConfig, CoreSingletonServices, CoreUserSession } from '@vramework/core/types'
import { BookService } from './book.service'

export interface Config extends CoreConfig {

}

export type SingletonServices = CoreSingletonServices & {
  books: BookService
}

export interface Services extends SingletonServices {

}

export interface UserSession extends CoreUserSession {

}
