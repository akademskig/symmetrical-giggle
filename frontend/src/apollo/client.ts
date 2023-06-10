import { gql } from '@apollo/client';
import { CART_FRAGMENT } from './cart';

export const CLIENT_FRAGMENT = gql`
  fragment ClientFragment on Client {
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
  query findAll($query: GetClientsInput) {
    clients(query: $query) {
      ...ClientFragment
    }
  }
  ${CLIENT_FRAGMENT}
`;
export const SUBMIT_CLIENT_DATA = gql`
  mutation submitClientData($input: SubmitClientDataInput!) {
    client(input: $input) {
      ...ClientFragment
    }
  }
  ${CLIENT_FRAGMENT}
`;

export const REMOVE_CLIENT = gql`
  mutation removeClient($id: String!) {
    removeClient(id: $id) {
      id
    }
  }
`;
