import { gql } from '@apollo/client';
import { CART_FRAGMENT } from './cart';

export const CLIENT_FRAGMENT = gql`
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
export const GET_CLIENTS = gql`
  query findAll($query: GetCustomersInput) {
    customers(query: $query) {
      ...CustomerFragment
    }
  }
  ${CLIENT_FRAGMENT}
`;
export const SUBMIT_CLIENT_DATA = gql`
  mutation submitCustomerData($input: SubmitCustomerDataInput!) {
    customer(input: $input) {
      ...CustomerFragment
    }
  }
  ${CLIENT_FRAGMENT}
`;

export const REMOVE_CLIENT = gql`
  mutation removeCustomer($id: String!) {
    removeCustomer(id: $id) {
      id
    }
  }
`;
