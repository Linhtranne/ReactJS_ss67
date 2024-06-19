// src/App.js
import React from 'react';
import { Provider } from 'react-redux';
import store from './Components/store';
import BookStore from './Components/BookStore';

const App = () => {
  return (
    <Provider store={store}>
      <BookStore />
    </Provider>
  );
};

export default App;
