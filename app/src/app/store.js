import { configureStore } from '@reduxjs/toolkit';
import accountReducer from './slice/account';

export const store = configureStore({
  reducer: {
    account: accountReducer,
  },
});