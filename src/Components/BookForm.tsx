// src/components/BookForm.js
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addBook, updateBook } from './BookAction';


const BookForm = ({ isEditMode, existingBook, onClose }) => {
  const dispatch = useDispatch();
  const [book, setBook] = useState({
    title: '',
    borrower: '',
    borrowDate: '',
    returnDate: '',
    status: 'Chưa trả',
  });

  useEffect(() => {
    if (isEditMode && existingBook) {
      setBook(existingBook);
    }
  }, [isEditMode, existingBook]);

  const handleInputChange = (e: { target: { name: unknown; value: unknown; }; }) => {
    const { name, value } = e.target;
    setBook({
      ...book,
      [name]: value,
    });
  };

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if (!book.title || !book.borrower || !book.borrowDate || !book.returnDate) {
      alert('Tất cả các trường không được phép để trống');
      return;
    }
    const borrowDate = new Date(book.borrowDate);
    const returnDate = new Date(book.returnDate);
    const currentDate = new Date();
    if (borrowDate < currentDate || returnDate < currentDate) {
      alert('Ngày mượn và ngày trả không được bé hơn ngày hiện tại');
      return;
    }

    if (isEditMode) {
      dispatch(updateBook(book));
    } else {
      dispatch(addBook({ ...book, id: Date.now() }));
    }
    onClose();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{isEditMode ? 'Sửa thông tin mượn sách' : 'Thêm thông tin mượn sách'}</h2>
      <input type="text" name="title" placeholder="Tên sách" value={book.title} onChange={handleInputChange} required />
      <input type="text" name="borrower" placeholder="Tên người mượn" value={book.borrower} onChange={handleInputChange} required />
      <input type="date" name="borrowDate" value={book.borrowDate} onChange={handleInputChange} required />
      <input type="date" name="returnDate" value={book.returnDate} onChange={handleInputChange} required />
      <button type="submit">{isEditMode ? 'Sửa' : 'Thêm'}</button>
    </form>
  );
};

export default BookForm;
