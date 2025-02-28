// @ts-ignore
import { configureStore } from '@reduxjs/toolkit';
import { combinedReducers } from './combined-reducers';

export const store = configureStore({
  reducer: combinedReducers
})

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
