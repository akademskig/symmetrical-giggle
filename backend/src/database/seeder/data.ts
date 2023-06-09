import { PriceBase, ProductType } from 'src/products/products.schema';

export const products = [
  {
    type: ProductType.BASE_COVERAGE,
    name: 'Base insurance',
    priceBase: PriceBase.FIXED_PRICE,
    prices: [
      {
        amount: 120,
        validFor: { age: { min: 30 }, cities: ['Zagreb', 'Rijeka'] },
      },
      {
        amount: 150,
        validFor: { cities: ['Zagreb', 'Rijeka'] },
      },
      {
        amount: 180,
      },
    ],
    mandatory: true,
  },
  {
    type: ProductType.COVERAGE,
    name: 'AO+',
    priceBase: PriceBase.FIXED_PRICE,
    prices: [
      {
        amount: 30,
        validFor: { age: { max: 30 } },
      },
      {
        amount: 105,
      },
    ],
  },
  {
    type: ProductType.COVERAGE,
    name: 'Bonus Protection',
    priceBase: PriceBase.BASE_PRICE,
    prices: [
      {
        amount: 12,
      },
    ],
  },
  {
    type: ProductType.COVERAGE,
    name: 'Glass Protection',
    priceBase: PriceBase.VEHICLE_POWER,
    prices: [
      {
        amount: 80,
      },
    ],
  },
  {
    type: ProductType.DISCOUNT,
    priceBase: PriceBase.TOTAL_PRICE,
    name: 'VIP Discount',
    prices: [
      {
        amount: 5,
        validFor: { vehiclePower: { min: 80 } },
      },
    ],
    mandatory: true,
  },

  {
    type: ProductType.DISCOUNT,
    priceBase: PriceBase.BASE_PRICE,
    name: 'Commercial Discount',
    mandatory: true,
    prices: [
      {
        amount: 10,
      },
    ],
  },
  {
    type: ProductType.DISCOUNT,
    priceBase: PriceBase.COVERAGES_TOTAL,
    name: 'Adviser Discount',
    mandatory: true,
    prices: [
      {
        amount: 20,
        validFor: { coverageAmount: { min: 2 } },
      },
    ],
  },
  {
    type: ProductType.SURCHARGE,
    priceBase: PriceBase.TOTAL_PRICE,
    name: 'Strong car surcharge',
    prices: [
      {
        amount: 10,
        validFor: { vehiclePower: { min: 100 } },
      },
    ],
    mandatory: true,
  },
];
