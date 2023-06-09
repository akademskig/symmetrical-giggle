import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { getCoverages, getDiscounts } from '../../redux/products';
import { getClientId, getCartProducts, setCart } from '../../redux/client';
import { useDispatch } from 'react-redux';
import { useMutation } from '@apollo/client';
import { ChangeHandler } from 'react-hook-form';
import { useAvalableProducts } from './useAvailableProducts';
import { TOGGLE_PRODUCT } from '../../apollo/cart';
import { Cart } from '../../types/client';

export const useToggleProducts = () => {
  const discounts = useSelector(getDiscounts);
  const coverages = useSelector(getCoverages);

  const clientId = useSelector(getClientId);
  const cartProducts = useSelector(getCartProducts);
  const { refetch } = useAvalableProducts();
  const dispatch = useDispatch();
  const [toggleProducts] = useMutation<{ cart: Cart }>(TOGGLE_PRODUCT);

  const onToggle: ChangeHandler = useCallback(
    async (e) => {
      const { data } = await toggleProducts({
        variables: { input: { productId: e.target.name, clientId } },
      });
      refetch({ input: { clientId } });
      dispatch(setCart(data?.cart));
    },
    [clientId, dispatch, refetch, toggleProducts]
  );

  return {
    onToggle,
    discounts,
    coverages,
    cartProducts,
  };
};
