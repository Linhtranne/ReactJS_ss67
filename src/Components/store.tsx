
import {legacy_createStore as createStore } from 'redux';
import bookReducer from './BookReducer';

const loadState = () => {
  try {
    const serializedState = localStorage.getItem('books');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('books', serializedState);
  } catch (err) { /* empty */ }
};

const preloadedState = loadState();

const store = createStore(
  bookReducer,
  preloadedState
);

store.subscribe(() => {
  saveState(store.getState());
});

export default store;
