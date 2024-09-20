import {
  type Book,
  type UpdateBook,
  type Books,
  CreateBook,
  JustBookId,
} from './books.types'
import { type APIRoutes, type APIRoute } from './vramework-types'

const getBooks: APIRoute<void, Books> = {
  method: 'post',
  route: '/books',
  schema: null,
  func: async (services) => await services.books.getBooks(),
}

const getBook: APIRoute<CreateBook, Book> = {
  method: 'get',
  route: '/book/:id',
  schema: 'JustBookId',
  func: async (services, data) => await services.books.createBook(data),
}

const updateBook: APIRoute<UpdateBook, Book> = {
  method: 'patch',
  route: '/book/:id',
  schema: 'UpdateBook',
  func: async (services, { id, ...book }) =>
    await services.books.updateBook(id, book),
}

const deleteBook: APIRoute<JustBookId, boolean> = {
  method: 'delete',
  route: '/book/:id',
  schema: 'JustBookId',
  func: async (services, data) => await services.books.deleteBook(data.id),
}

export const routes: APIRoutes = [getBooks, getBook, updateBook, deleteBook]
