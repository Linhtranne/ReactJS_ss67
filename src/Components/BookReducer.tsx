// src/BookReducer.js
import { ADD_BOOK, DELETE_BOOK, UPDATE_BOOK, FILTER_BOOKS } from './BookAction';

const initialState = {
  books: [
    { id: 1, title: 'Harry Potter và Hòn Đá Phù Thủy', borrower: 'Nguyễn Văn A', borrowDate: '10/04/2024', returnDate: '17/04/2024', status: 'Đã trả' },
  ],
  filteredBooks: [],
  filterStatus: 'All',
};

const bookReducer = (state = initialState, action: { type: any; payload: string | number; }) => {
  switch (action.type) {
    case ADD_BOOK:
      return {
        ...state,
        books: [...state.books, action.payload],
      };
    case DELETE_BOOK:
      return {
        ...state,
        books: state.books.filter(book => book.id !== action.payload),
      };
    case UPDATE_BOOK:
      return {
        ...state,
        books: state.books.map(book =>
          book.id === action.payload.id ? action.payload : book
        ),
      };
    case FILTER_BOOKS:
      return {
        ...state,
        filterStatus: action.payload,
        filteredBooks: action.payload === 'All' ? state.books : state.books.filter(book => book.status === action.payload),
      };
    default:
      return state;
  }
};

export default bookReducer;
