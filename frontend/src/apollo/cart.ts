import { gql } from '@apollo/client';

export const CART_PRODUCT_FRAGMENT = gql`
  fragment CartProductFragment on CartProduct {
    _id
    name
    type
    price
    amount
  }
`;
export const CART_FRAGMENT = gql`
  fragment CartFragment on Cart {
    basePrice
    totalPrice
    products {
      ...CartProductFragment
    }
  }
  ${CART_PRODUCT_FRAGMENT}
`;

export const TOGGLE_PRODUCT = gql`
  mutation toggleProduct($input: ToggleProductInput!) {
    cart(input: $input) {
      ...CartFragment
    }
  }
  ${CART_FRAGMENT}
`;
