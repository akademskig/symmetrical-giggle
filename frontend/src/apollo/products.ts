import { gql } from '@apollo/client';
export const PRICE_FRAGMENT = gql`
  fragment PriceFragment on Price {
    amount
    base
  }
`;

export const PRODUCT_FRAGMENT = gql`
  fragment ProductFragment on GetAvailableProductsResponse {
    _id
    name
    type
    mandatory
    amount
  }
`;

export const GET_AVAILABLE_PRODUCTS = gql`
  query getAvailableProducts($input: GetAvailableProductsInput!) {
    products(input: $input) {
      ...ProductFragment
    }
  }
  ${PRODUCT_FRAGMENT}
`;
