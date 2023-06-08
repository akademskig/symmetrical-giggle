import { createSelector, createSlice } from '@reduxjs/toolkit';
import { Product, ProductType } from '../types/product';

export const productsSlice = createSlice({
  name: 'products',
  initialState: [],
  reducers: {
    setProducts: (state, action) => action.payload,
  },
});
export const getProducts = createSelector(
  (state: { products: Product[] }) => state,
  (state) => state.products
);
export const getCoverages = createSelector(
  (state: { products: Product[] }) => state,
  (state) => {
    return (state?.products || []).filter(
      (p) => p.type === ProductType.COVERAGE || p.type === ProductType.SURCHARGE
    );
  }
);
export const getDiscounts = createSelector(
  (state: { products: Product[] }) => state,
  (state) =>
    (state?.products || []).filter((p) => p.type === ProductType.DISCOUNT)
);

export const { setProducts } = productsSlice.actions;
