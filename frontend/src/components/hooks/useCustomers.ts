import { useQuery } from '@apollo/client';
import { GET_CUSTOMERS } from '../../apollo/customer';
import { Customer } from '../../types/customer';
import { useMemo } from 'react';

const useCustomers = () => {
  const { data, refetch } = useQuery<{ customers: Customer[] }>(GET_CUSTOMERS);

  const customers = useMemo(() => data?.customers || [], [data?.customers]);

  return {
    customers,
    refetchCustomers: refetch,
  };
};
export default useCustomers;
