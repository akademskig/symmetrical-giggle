import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { productsSlice } from './products';
import { clientSlice } from './client';

const reducer = combineReducers({
  products: productsSlice.reducer,
  client: clientSlice.reducer,
});
export const store = configureStore({
  reducer,
});
store.subscribe(() => console.log(store.getState()));
export default store;
