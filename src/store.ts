import { configureStore } from '@reduxjs/toolkit';
import blogReducer from './pages/blog/blog.slice';
import { useDispatch } from 'react-redux';

export const store = configureStore({
  reducer: {
    blog: blogReducer
  }
});

// Get the type of the state & dispatch from the store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Custom hook helps dispatch compatible with async thunk
export const useAppDispatch = () => useDispatch<AppDispatch>()