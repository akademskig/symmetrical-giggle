import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { round } from 'lodash';
import { CartProduct, Client } from 'src/clients/clients.schema';
import { PriceBase, ProductType } from 'src/products/products.schema';
import { ObjectId } from 'mongodb';

@Injectable()
export class CalculationService {
  constructor(@InjectModel(Client.name) private clientModel: Model<Client>) {}

  private getProductPrice({
    cartProduct,
    vehiclePower,
    basePrice,
  }: {
    cartProduct: CartProduct;
    vehiclePower: number;
    basePrice: number;
  }) {
    switch (cartProduct.priceBase) {
      case PriceBase.FIXED_PRICE:
        return round(cartProduct.amount, 2);
      case PriceBase.VEHICLE_POWER:
        return round(vehiclePower * (cartProduct.amount / 100), 2);
      case PriceBase.BASE_PRICE:
      case PriceBase.COVERAGES_TOTAL:
      case PriceBase.TOTAL_PRICE:
        return round(basePrice * (cartProduct.amount / 100), 2);
      default:
        return 0;
    }
  }

  private getTotalPrice({
    productsWithPrices,
    voucher = 0,
  }: {
    productsWithPrices: CartProduct[];
    voucher?: number;
  }) {
    const coveragePrice = productsWithPrices
      .filter(
        (p) =>
          p.type === ProductType.COVERAGE ||
          p.type === ProductType.SURCHARGE ||
          p.type === ProductType.BASE_COVERAGE
      )
      .reduce((a, v) => a + v.price, 0);
    const discountPrice = productsWithPrices
      .filter((p) => p.type === ProductType.DISCOUNT)
      .reduce((a, v) => a + v.price, 0);

    const totalPrice = coveragePrice - discountPrice - voucher;
    return totalPrice;
  }
  getProductPrices({
    cartProducts,
    vehiclePower: vp,
    basePrice,
    adjustmentCoef = 1,
  }: {
    cartProducts: CartProduct[];
    vehiclePower: number;
    basePrice: number;
    adjustmentCoef?: number;
  }) {
    const productsWithPrices = cartProducts.map((p) => {
      if (p.priceBase === PriceBase.FIXED_PRICE) {
        return {
          ...p,
          amount: p.amount * adjustmentCoef,
        };
      }
      return p;
    });

    const vehiclePower = vp * adjustmentCoef;
    const productsWithPrices2 = productsWithPrices.map((p) => {
      return {
        ...p,
        price: this.getProductPrice({
          cartProduct: p,
          vehiclePower,
          basePrice,
        }),
      };
    });

    const productsWithPrices3 = productsWithPrices2.map((p) => {
      if (p.priceBase === PriceBase.COVERAGES_TOTAL) {
        const coveragesTotal = productsWithPrices2
          .filter(
            (p) =>
              p.type === ProductType.COVERAGE ||
              p.type === ProductType.BASE_COVERAGE
          )
          .reduce((a, v) => a + v.price, 0);

        return {
          ...p,
          price: this.getProductPrice({
            cartProduct: p,
            vehiclePower,
            basePrice: coveragesTotal,
          }),
        };
      }
      return p;
    });
    const totalPrice = this.getTotalPrice({
      productsWithPrices: productsWithPrices3,
    });
    const productsWithPrices4 = productsWithPrices3.map((p) => {
      if (p.priceBase === PriceBase.TOTAL_PRICE) {
        return {
          ...p,
          price: this.getProductPrice({
            cartProduct: p,
            vehiclePower,
            basePrice: totalPrice,
          }),
        };
      }
      return p;
    });
    return { productsWithPrices: productsWithPrices4, totalPrice };
  }
  calculatePricesFromTotal = ({
    priceMatch = 0,
    cartProducts,
    basePrice = 0,
    totalPrice = 0,
    vehiclePower = 0,
  }: {
    priceMatch: number;
    cartProducts: CartProduct[];
    basePrice: number;
    totalPrice: number;
    vehiclePower: number;
  }) => {
    const diff = priceMatch / totalPrice;
    const validDiff = !isNaN(diff) ? diff : 1;
    const newBase = basePrice * validDiff;
    const { productsWithPrices, totalPrice: newTotal } = this.getProductPrices({
      cartProducts,
      vehiclePower,
      basePrice: newBase,
      adjustmentCoef: validDiff,
    });
    return {
      adjustedProductsWithPrices: productsWithPrices,
      newTotal,
      newBase,
    };
  };
  async calculatePrices({ clientId }: { clientId: ObjectId }) {
    const client = await this.clientModel.findOne({ _id: clientId });

    const cartProducts = client.cart.products;
    const vehiclePower = client.vehiclePower;
    const voucher = client.voucher || 0;
    const priceMatch = client.priceMatch || 0;
    const baseCoverage = cartProducts.find(
      (cp) => cp.type === ProductType.BASE_COVERAGE
    );
    const basePriceInitial = baseCoverage?.amount || 0;
    const {
      productsWithPrices: productsWithPricesInitial,
      totalPrice: totalPriceInitial,
    } = this.getProductPrices({
      cartProducts,
      vehiclePower,
      basePrice: basePriceInitial,
    });
    const { adjustedProductsWithPrices, newTotal, newBase } =
      this.calculatePricesFromTotal({
        priceMatch,
        cartProducts,
        basePrice: basePriceInitial,
        totalPrice: totalPriceInitial,
        vehiclePower,
      });
    const productsWithPrices = priceMatch
      ? adjustedProductsWithPrices
      : productsWithPricesInitial;
    const totalPrice = priceMatch ? newTotal : totalPriceInitial;
    const basePrice = priceMatch ? newBase : basePriceInitial;
    await this.clientModel.updateOne(
      { _id: clientId },
      {
        $set: {
          'cart.products': productsWithPrices,
          'cart.totalPrice': totalPrice - voucher,
          'cart.basePrice': basePrice,
        },
      }
    );
    return this.clientModel.findOne({ _id: clientId }, { cart: 1 });
  }
}
