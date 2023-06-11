import { useDispatch, useSelector } from 'react-redux';
import { getCustomerId } from '../../redux/customer';
import { useQuery } from '@apollo/client';
import { GET_AVAILABLE_PRODUCTS } from '../../apollo/products';
import { useEffect } from 'react';
import { setProducts } from '../../redux/products';

export const useAvalableProducts = () => {
  const customerId = useSelector(getCustomerId);
  const dispatch = useDispatch();
  const { data, refetch } = useQuery(GET_AVAILABLE_PRODUCTS, {
    variables: { input: { customerId } },
    skip: !customerId,
  });

  useEffect(() => {
    dispatch(setProducts(data?.products || []));
  }, [data?.products, dispatch]);

  return {
    availableProducts: data?.products || [],
    refetch,
  };
};
