import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { getCoverages, getDiscounts } from '../../redux/products';
import { getCustomerId, getCartProducts, setCart } from '../../redux/customer';
import { useDispatch } from 'react-redux';
import { useMutation } from '@apollo/client';
import { ChangeHandler } from 'react-hook-form';
import { useAvalableProducts } from './useAvailableProducts';
import { TOGGLE_PRODUCT } from '../../apollo/cart';
import { Cart } from '../../types/customer';

export const useToggleProducts = () => {
  const discounts = useSelector(getDiscounts);
  const coverages = useSelector(getCoverages);

  const customerId = useSelector(getCustomerId);
  const cartProducts = useSelector(getCartProducts);
  const { refetch } = useAvalableProducts();
  const dispatch = useDispatch();
  const [toggleProducts] = useMutation<{ cart: Cart }>(TOGGLE_PRODUCT);

  const onToggle: ChangeHandler = useCallback(
    async (e) => {
      const { data } = await toggleProducts({
        variables: { input: { productId: e.target.name, customerId } },
      });
      refetch({ input: { customerId } });
      dispatch(setCart(data?.cart));
    },
    [customerId, dispatch, refetch, toggleProducts]
  );

  return {
    onToggle,
    discounts,
    coverages,
    cartProducts,
  };
};
