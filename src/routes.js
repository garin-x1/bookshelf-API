import * as handler from './handler.js'

export const routes = [
  {
    method: 'GET',
    path: '/books',
    handler: handler.getBook
  },
  {
    method: 'POST',
    path: '/books',
    handler: handler.addBook
  },
  {
    method: 'GET',
    path: '/books/{bookId}',
    handler: handler.getDetailBook
  },
  {
    method: 'PUT',
    path: '/books/{id}',
    handler: handler.editBook
  },
  {
    method: 'DELETE',
    path: '/books/{id}',
    handler: handler.deleteBook
  }
]
