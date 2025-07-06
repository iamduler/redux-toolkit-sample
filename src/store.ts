import { configureStore } from '@reduxjs/toolkit';
import { blogApi } from './pages/blog/blog.service';
import { setupListeners } from '@reduxjs/toolkit/query';
import blogReducer from './pages/blog/blog.slice';

export const store = configureStore({
  reducer: {
    blogState: blogReducer,
    [blogApi.reducerPath]: blogApi.reducer, // Khai báo reducer path để RTK query có thể hoạt động
  },
  // Thêm middleware để enable các tính năng như caching, polling, invalidation, etc. của RTK query
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(blogApi.middleware)
});

// Optional nhưng bắt buộc nếu dùng tính năng refetchOnFocus, refetchOnReconnect
setupListeners(store.dispatch);

// Get the type of the state & dispatch from the store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;