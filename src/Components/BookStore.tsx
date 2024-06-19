// src/BookStore.js
import { SetStateAction, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteBook, filterBooks, updateBook } from './BookAction';
import BookForm from './BookForm';
import Modal from './Modal';
import './BookStore.css';

const BookStore = () => {
  const { books, filteredBooks, filterStatus } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [bookToEdit, setBookToEdit] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookToDelete, setBookToDelete] = useState(null);

  const handleEditBook = (book: SetStateAction<null>) => {
    setIsFormOpen(true);
    setIsEditMode(true);
    setBookToEdit(book);
  };

  const handleDeleteBook = (id: null) => {
    dispatch(deleteBook(id));
    setIsModalOpen(false);
  };

  const handleFilterChange = (e: { target: { value: any; }; }) => {
    dispatch(filterBooks(e.target.value));
  };

  return (
    <div className="App">
      <h2>Quản lý mượn trả sách</h2>
      <button onClick={() => { setIsFormOpen(true); setIsEditMode(false); setBookToEdit(null); }}>Thêm thông tin</button>
      <div>
        <label>Lọc theo trạng thái: </label>
        <select value={filterStatus} onChange={handleFilterChange}>
          <option value="All">Tất cả</option>
          <option value="Đã trả">Đã trả</option>
          <option value="Chưa trả">Chưa trả</option>
        </select>
      </div>
      <table>
        <thead>
          <tr>
            <th>STT</th>
            <th>Tên sách</th>
            <th>Sinh viên mượn</th>
            <th>Ngày mượn</th>
            <th>Ngày trả</th>
            <th>Trạng thái</th>
            <th>Chức năng</th>
          </tr>
        </thead>
        <tbody>
          {(filterStatus === 'All' ? books : filteredBooks).map((book, index) => (
            <tr key={book.id}>
              <td>{index + 1}</td>
              <td>{book.title}</td>
              <td>{book.borrower}</td>
              <td>{book.borrowDate}</td>
              <td>{book.returnDate}</td>
              <td>
                <button
                  className={book.status === 'Đã trả' ? 'status-returned' : 'status-not-returned'}
                  onClick={() => {
                    dispatch(updateBook({ ...book, status: book.status === 'Đã trả' ? 'Chưa trả' : 'Đã trả' }));
                  }}
                >
                  {book.status}
                </button>
              </td>
              <td className='td_button'>
                <button className='edit' onClick={() => handleEditBook(book)}>Sửa</button>
                <button className='delete' onClick={() => {
                  setIsModalOpen(true);
                  setBookToDelete(book.id);
                }}>Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal isOpen={isFormOpen} onClose={() => setIsFormOpen(false)}>
        <BookForm
          isEditMode={isEditMode}
          existingBook={bookToEdit}
          onClose={() => setIsFormOpen(false)}
        />
      </Modal>
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <p>Bạn có chắc chắn muốn xóa sách này không?</p>
          <button onClick={() => setIsModalOpen(false)}>Hủy</button>
          <button onClick={() => handleDeleteBook(bookToDelete)}>Xóa</button>
        </Modal>
      )}
    </div>
  );
};

export default BookStore;
