import { configureStore } from '@reduxjs/toolkit';

import todosReducer from '@/store/slices/todosSlice';
import filtersReducer from '@/store/slices/filtersSlice';

const store = configureStore({
  reducer: {
    todos: todosReducer,
    filters: filtersReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
