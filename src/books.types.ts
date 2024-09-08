export type PickRequired<T, K extends keyof T> = Pick<T, K> & Partial<T>;
type RequireAtLeastOne<T> = {
    [K in keyof T]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<keyof T, K>>>
  }[keyof T]

/**
 * Interface representing a Book.
 */
export interface Book {
    id: number;
    title: string;
    author: string;
    year: number;
}


export type Books = Book[]
export type JustBookId = Pick<Book, 'id'>
export type CreateBook = Omit<Book, 'id'>
export type UpdateBook = JustBookId & RequireAtLeastOne<CreateBook>

