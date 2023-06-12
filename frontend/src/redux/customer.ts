import { createSelector, createSlice } from '@reduxjs/toolkit';
import { State } from './store';
import { ProductType } from '../types/product';

export const customerSlice = createSlice({
  name: 'customer',
  initialState: {},
  reducers: {
    setCustomer: (state, action) => action.payload,
    setCart: (state, action) => {
      return {
        ...state,
        cart: action.payload,
      };
    },
  },
});

const selectSelf = (state: State) => state;

export const getCustomerId = createSelector(
  selectSelf,
  (state) => state.customer._id
);

export const getCustomer = createSelector(
  selectSelf,
  (state) => state.customer
);

export const getCart = createSelector(
  selectSelf,
  (state) => state.customer?.cart
);
export const getCartProducts = createSelector(
  selectSelf,
  (state) => state.customer?.cart?.products || []
);

export const { setCustomer, setCart } = customerSlice.actions;
