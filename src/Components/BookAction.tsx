// src/BookAction.js
export const ADD_BOOK = 'ADD_BOOK';
export const DELETE_BOOK = 'DELETE_BOOK';
export const UPDATE_BOOK = 'UPDATE_BOOK';
export const FILTER_BOOKS = 'FILTER_BOOKS';

export const addBook = (book: { id: number; title: string; borrower: string; borrowDate: string; returnDate: string; status: string; }) => ({
  type: ADD_BOOK,
  payload: book,
});

export const deleteBook = (bookId: unknown) => ({
  type: DELETE_BOOK,
  payload: bookId,
});

export const updateBook = (book: { id?: unknown; title: string; borrower: string; borrowDate: string; returnDate: string; status: string; }) => ({
  type: UPDATE_BOOK,
  payload: book,
});

export const filterBooks = (status: unknown) => ({
  type: FILTER_BOOKS,
  payload: status,
});
