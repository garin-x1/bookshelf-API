import { nanoid } from 'nanoid'
import { books } from './books.js'

export const addBook = (request, h) => {
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading
  } = request.payload
  if (name === undefined) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku'
    }).code(400)
    return response
  }
  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount'
    }).code(400)
    return response
  }
  const id = nanoid(16)
  const insertedAt = new Date().toISOString()
  const updatedAt = insertedAt
  const finished = pageCount === readPage
  const newBook = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt,
    updatedAt
  }
  books.push(newBook)
  const response = h.response({
    status: 'success',
    message: 'Buku berhasil ditambahkan',
    data: {
      bookId: id
    }
  }).code(201)
  return response
}

export const getBook = (request, h) => {
  const { name, reading, finished } = request.query
  let resBook = []
  if (name !== undefined) {
    resBook = books.filter(book => book.name.toLowerCase().includes(name.toLowerCase()))
  } else if (reading !== undefined) {
    resBook = books.filter(book => book.reading === (reading === '1'))
  } else if (finished !== undefined) {
    resBook = books.filter(book => book.finished === (finished === '1'))
  }
  resBook = (resBook.length !== 0)
    ? resBook = resBook.map(book => ({
      id: book.id,
      name: book.name,
      publisher: book.publisher
    }))
    : resBook = books.map(book => ({
      id: book.id,
      name: book.name,
      publisher: book.publisher
    }))
  const response = h.response({
    status: 'success',
    data: {
      books: resBook
    }
  }).code(200)
  return response
}

export const getDetailBook = (request, h) => {
  const { bookId } = request.params
  const resBook = books.filter((book) => book.id === bookId)
  if (resBook.length === 0) {
    const response = h.response({
      status: 'fail',
      message: 'Buku tidak ditemukan'
    })
    response.code(404)
    return response
  }
  const response = h.response({
    status: 'success',
    data: {
      book:
        resBook[0]
    }
  })
  response.code(200)
  return response
}

export const editBook = (request, h) => {
  const { id } = request.params
  const bookIndex = books.findIndex((book) => book.id === id)
  if (bookIndex === -1) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Id tidak ditemukan'
    }).code(404)
    return response
  }

  const {
    name,
    pageCount,
    readPage
  } = request.payload
  if (name === undefined) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Mohon isi nama buku'
    }).code(400)
    return response
  }
  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount'
    }).code(400)
    return response
  }

  const {
    year,
    author,
    summary,
    publisher,
    reading
  } = request.payload
  const updatedAt = new Date().toISOString()
  books[bookIndex] = {
    ...books[bookIndex],
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
    updatedAt
  }
  const response = h.response({
    status: 'success',
    message: 'Buku berhasil diperbarui'
  }).code(200)
  return response
}

export const deleteBook = (request, h) => {
  const { id } = request.params
  const bookIndex = books.findIndex((book) => book.id === id)
  if (bookIndex === -1) {
    const response = h.response({
      status: 'fail',
      message: 'Buku gagal dihapus. Id tidak ditemukan'
    }).code(404)
    return response
  }
  books.splice(bookIndex, 1)
  const response = h.response({
    status: 'success',
    message: 'Buku berhasil dihapus'
  }).code(200)
  return response
}
