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
  async calculatePrices({ clientId }: { clientId: ObjectId }) {
    const client = await this.clientModel.findOne({ _id: clientId });

    const cartProducts = client.cart.products;
    const vehiclePower = client.vehiclePower;
    const voucher = client.voucher || 0;
    const baseCoverage = cartProducts.find(
      (cp) => cp.type === ProductType.BASE_COVERAGE
    );
    const basePrice = baseCoverage?.amount || 0;
    const productsWithPrices = cartProducts.map((p) => {
      return {
        ...p,
        price: this.getProductPrice({
          cartProduct: p,
          vehiclePower,
          basePrice,
        }),
      };
    });
    const productsWithPrices2 = productsWithPrices.map((p) => {
      if (p.priceBase === PriceBase.COVERAGES_TOTAL) {
        const coveragesTotal = productsWithPrices
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
      productsWithPrices: productsWithPrices2,
    });
    const productsWithPrices3 = productsWithPrices2.map((p) => {
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
    await this.clientModel.updateOne(
      { _id: clientId },
      {
        $set: {
          'cart.products': productsWithPrices3,
          'cart.totalPrice': totalPrice - voucher,
          'cart.basePrice': basePrice,
        },
      }
    );
    return this.clientModel.findOne({ _id: clientId }, { cart: 1 });
  }
}
