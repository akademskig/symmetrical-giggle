import { gql } from '@apollo/client';
import { CART_FRAGMENT } from './cart';

export const CUSTOMER_FRAGMENT = gql`
  fragment CustomerFragment on Customer {
    _id
    name
    city
    birthDate
    vehiclePower
    voucher
    cart {
      ...CartFragment
    }
  }
  ${CART_FRAGMENT}
`;
export const GET_CUSTOMERS = gql`
  query findAll {
    customers {
      ...CustomerFragment
    }
  }
  ${CUSTOMER_FRAGMENT}
`;
export const SUBMIT_CUSTOMER_DATA = gql`
  mutation submitCustomerData($input: SubmitCustomerDataInput!) {
    customer(input: $input) {
      ...CustomerFragment
    }
  }
  ${CUSTOMER_FRAGMENT}
`;
