export enum ProductType {
  DISCOUNT = 'DISCOUNT',
  COVERAGE = 'COVERAGE',
  SURCHARGE = 'SURCHARGE',
}

export enum PriceBase {
  BASE_PRICE,
  VEHICLE_POWER,
  FIXED_PRICE,
  TOTAL_PRICE,
}

export interface Price {
  base: PriceBase;
  amount: number;
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
  price: Price;
  conditions: Condition;
}
