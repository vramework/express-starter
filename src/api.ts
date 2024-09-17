import {
  CoreConfig,
  CoreSingletonServices,
  CoreUserSession,
} from '@vramework/core/types'
import { BookService } from './book.service'
import { JWTService } from '@vramework/core'

export interface Config extends CoreConfig {}

export interface UserSession extends CoreUserSession {}

export type SingletonServices = CoreSingletonServices & {
  jwt: JWTService<UserSession>
  books: BookService
}

export interface Services extends SingletonServices {}
