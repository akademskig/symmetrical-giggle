import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { productsSlice } from './products';
import { customerSlice } from './customer';
import { Product } from '../types/product';
import { Customer } from '../types/customer';

export type State = {
  products: Product[];
  customer: Customer;
};

const reducer = combineReducers({
  products: productsSlice.reducer,
  customer: customerSlice.reducer,
});
export const store = configureStore({
  reducer,
});
export default store;
