export enum ProductType {
  DISCOUNT = 'DISCOUNT',
  COVERAGE = 'COVERAGE',
  BASE_COVERAGE = 'BASE_COVERAGE',
  SURCHARGE = 'SURCHARGE',
}

export enum PriceBase {
  BASE_PRICE,
  VEHICLE_POWER,
  FIXED_PRICE,
  TOTAL_PRICE,
}

export enum Currency {
  EUR = 'EUR',
}
export interface Condition {
  age: { min?: number; max?: number };
  vehiclePower: { min?: number; max?: number };
  coverageAmount: { min?: number; max?: number };
}

export interface Product {
  _id: string;
  name: string;
  type: ProductType;
  priceBase: PriceBase;
  price: number;
  currency: Currency.EUR;
}
