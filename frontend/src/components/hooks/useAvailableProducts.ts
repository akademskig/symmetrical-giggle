import { useDispatch, useSelector } from 'react-redux';
import { getClientId } from '../../redux/client';
import { useQuery } from '@apollo/client';
import { GET_AVAILABLE_PRODUCTS } from '../../apollo/products';
import { useEffect } from 'react';
import { setProducts } from '../../redux/products';

export const useAvalableProducts = () => {
  const clientId = useSelector(getClientId);
  const dispatch = useDispatch();
  const { data, refetch } = useQuery(GET_AVAILABLE_PRODUCTS, {
    variables: { input: { clientId } },
    skip: !clientId,
  });

  useEffect(() => {
    dispatch(setProducts(data?.products || []));
  }, [data?.products, dispatch]);

  return {
    availableProducts: data?.products || [],
    refetch,
  };
};
