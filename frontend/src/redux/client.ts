import { createSelector, createSlice } from '@reduxjs/toolkit';
import { Client } from '../types/client';

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
export const getClientId = createSelector(
  (state: { client: Client }) => state,
  (state) => state.client._id
);
export const getSelectedProducts = createSelector(
  (state: { client: Client }) => state,
  (state) => state.client?.cart?.products || []
);
export const { setClient, setCart } = clientSlice.actions;
