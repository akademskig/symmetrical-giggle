import { createDraftSafeSelector, createSlice } from '@reduxjs/toolkit';
import { ProductType } from '../types/product';
import { State } from './store';

export const productsSlice = createSlice({
  name: 'products',
  initialState: [],
  reducers: {
    setProducts: (state, action) => action.payload,
  },
});

const selectSelf = (state: State) => state;

export const getProducts = createDraftSafeSelector(
  selectSelf,
  (state) => state.products
);
export const getCoverages = createDraftSafeSelector(selectSelf, (state) => {
  return (state?.products || []).filter(
    (p) => p.type === ProductType.COVERAGE || p.type === ProductType.SURCHARGE
  );
});
export const getDiscounts = createDraftSafeSelector(selectSelf, (state) =>
  (state?.products || []).filter((p) => p.type === ProductType.DISCOUNT)
);

export const { setProducts } = productsSlice.actions;
