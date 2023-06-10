import { Currency, PriceBase, ProductType } from './product';

export interface CartProduct {
  _id: string;
  amount: number;
  priceBase: PriceBase;
  price: number;
  name: string;
  type: ProductType;
  currency: Currency;
}

export interface Cart {
  products: CartProduct[];
  basePrice: number;
  totalPrice: number;
}

export interface Client {
  _id: string;
  name: string;
  birthDate: Date;
  city: string;
  vehiclePower: string;
  cart: Cart;
  voucher: number;
}
