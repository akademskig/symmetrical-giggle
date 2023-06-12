import { Currency, PriceBase, ProductType } from 'src/products/products.schema';

export const products = [
  {
    type: ProductType.BASE_COVERAGE,
    name: 'Base Coverage',
    priceBase: PriceBase.FIXED_PRICE,
    currency: Currency.EUR,
    prices: [
      {
        amount: 120,
        validFor: { ageMin: 30, cities: ['Zagreb', 'Rijeka'] },
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
    currency: Currency.EUR,
    prices: [
      {
        amount: 30,
        validFor: { ageMax: 30 },
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
    currency: Currency.EUR,
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
    currency: Currency.EUR,
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
    currency: Currency.EUR,
    prices: [
      {
        amount: 5,
        validFor: { vehiclePowerMin: 80 },
      },
    ],
    mandatory: true,
  },

  {
    type: ProductType.DISCOUNT,
    priceBase: PriceBase.BASE_PRICE,
    name: 'Commercial Discount',
    mandatory: true,
    currency: Currency.EUR,
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
    currency: Currency.EUR,
    prices: [
      {
        amount: 20,
        validFor: { coverageAmountMin: 2 },
      },
    ],
  },
  {
    type: ProductType.SURCHARGE,
    priceBase: PriceBase.TOTAL_PRICE,
    name: 'Strong car surcharge',
    currency: Currency.EUR,
    prices: [
      {
        amount: 10,
        validFor: { vehiclePowerMin: 100 },
      },
    ],
    mandatory: true,
  },
];
