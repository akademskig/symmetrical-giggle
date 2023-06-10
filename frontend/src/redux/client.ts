import { createSelector, createSlice } from '@reduxjs/toolkit';
import { State } from './store';
import { ProductType } from '../types/product';

export const clientSlice = createSlice({
  name: 'client',
  initialState: {},
  reducers: {
    setClient: (state, action) => action.payload,
    setCart: (state, action) => {
      return {
        ...state,
        cart: action.payload,
      };
    },
  },
});

const selectSelf = (state: State) => state;

export const getClientId = createSelector(
  selectSelf,
  (state) => state.client._id
);
export const getVoucher = createSelector(
  selectSelf,
  (state) => state.client.voucher
);
export const getCart = createSelector(
  selectSelf,
  (state) => state.client?.cart
);
export const getCartProducts = createSelector(
  selectSelf,
  (state) => state.client?.cart?.products || []
);
export const getCartCoverages = createSelector(
  selectSelf,
  (state) =>
    (state.client?.cart?.products || []).filter(
      (p) => p.type === ProductType.COVERAGE || p.type === ProductType.SURCHARGE
    ) || []
);
export const getCartDiscounts = createSelector(
  selectSelf,
  (state) =>
    (state.client?.cart?.products || []).filter(
      (p) => p.type === ProductType.DISCOUNT
    ) || []
);

export const getCartSurcharges = createSelector(
  selectSelf,
  (state) =>
    (state.client?.cart?.products || []).filter(
      (p) => p.type === ProductType.SURCHARGE
    ) || []
);

export const { setClient, setCart } = clientSlice.actions;
