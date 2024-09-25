import { addRoute } from './vramework-types'

import {
  type UpdateBook,
  type CreateBook,
  type JustBookId,
} from './books.types'
import { Services } from './api'

addRoute({
  method: 'post',
  route: '/books',
  func: async (services: Services) => await services.books.getBooks(),
})

addRoute({
  method: 'post',
  route: '/book',
  func: async (services: Services, data: CreateBook) => await services.books.createBook(data),
})

addRoute({
  method: 'get',
  route: '/book/:id',
  func: async (services: Services, data: JustBookId) => await services.books.getBook(data.id)
})

addRoute({
  method: 'patch',
  route: '/book/:id',
  func: async (services: Services, { id, ...update }: UpdateBook) => {
    return await services.books.updateBook(id, update)
  }
})

addRoute({
  method: 'delete',
  route: '/book/:id',
  func: async (services: Services, data: JustBookId) => await services.books.deleteBook(data.id)
})
