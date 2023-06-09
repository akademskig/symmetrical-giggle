import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { productsSlice } from './products';
import { clientSlice } from './client';
import { Product } from '../types/product';
import { Client } from '../types/client';

export type State = {
  products: Product[];
  client: Client;
};

const reducer = combineReducers({
  products: productsSlice.reducer,
  client: clientSlice.reducer,
});
export const store = configureStore({
  reducer,
});
export default store;
