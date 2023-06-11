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
export const getVoucher = createSelector(
  selectSelf,
  (state) => state.customer.voucher
);
export const getCart = createSelector(
  selectSelf,
  (state) => state.customer?.cart
);
export const getCartProducts = createSelector(
  selectSelf,
  (state) => state.customer?.cart?.products || []
);
export const getCartCoverages = createSelector(
  selectSelf,
  (state) =>
    (state.customer?.cart?.products || []).filter(
      (p) => p.type === ProductType.COVERAGE || p.type === ProductType.SURCHARGE
    ) || []
);
export const getCartBaseCoverage = createSelector(selectSelf, (state) =>
  (state.customer?.cart?.products || []).find(
    (p) => p.type === ProductType.BASE_COVERAGE
  )
);
export const getCartDiscounts = createSelector(
  selectSelf,
  (state) =>
    (state.customer?.cart?.products || []).filter(
      (p) => p.type === ProductType.DISCOUNT
    ) || []
);

export const getCartSurcharges = createSelector(
  selectSelf,
  (state) =>
    (state.customer?.cart?.products || []).filter(
      (p) => p.type === ProductType.SURCHARGE
    ) || []
);

export const { setCustomer, setCart } = customerSlice.actions;
