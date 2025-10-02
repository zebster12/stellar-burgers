import { userSlice } from './user';
import { constructorSlice } from './constructorSlice';
import { ingredientsSlice } from './ingredientSlice';
import { ordersSlice } from './orderSlice';
import { configureStore, combineSlices } from '@reduxjs/toolkit';
import {
  TypedUseSelectorHook,
  useDispatch as rawUseDispatch,
  useSelector as rawUseSelector
} from 'react-redux';

const rootReducer = combineSlices(
  ingredientsSlice,
  constructorSlice,
  ordersSlice,
  userSlice
);

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export const useDispatch = () => rawUseDispatch<AppDispatch>();
export const useSelector: TypedUseSelectorHook<RootState> = rawUseSelector;

export default store;
