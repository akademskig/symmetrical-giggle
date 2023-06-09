import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductType } from 'src/products/products.schema';
import { CartProduct, Client } from 'src/clients/clients.schema';
import { ProductsService } from 'src/products/products.service';
import { ObjectId } from 'mongodb';
import { PriceBase } from 'src/products/products.schema';
import { ToggleProductInput } from './dtos/toggleProductInput';

@Injectable()
export class CartService {
  constructor(
    @InjectModel(Client.name) private clientModel: Model<Client>,
    private productService: ProductsService,
  ) {}

  async toggleProduct(input: ToggleProductInput) {
    const { clientId, productId } = input;
    const client = await this.clientModel.findById(
      { _id: clientId },
      { cart: 1 },
    );
    const product = client.cart.products.find(
      (p) => p._id.toString() === productId.toString(),
    );

    const r = await this.clientModel.updateOne(
      { _id: clientId },
      {
        $pull: {
          'cart.products': product,
        },
      },
    );
    if (r.acknowledged === false) {
      await this.clientModel.updateOne(
        { _id: clientId },
        {
          $addToSet: {
            'cart.products': { _id: productId },
          },
        },
      );
    }
    return this.updateSelectedProducts(input);
  }
  async updateSelectedProducts({ clientId }: { clientId: ObjectId }) {
    const client = await this.clientModel.findOne({ _id: clientId });
    const cartProductsIds =
      client?.cart.products?.map((p) => p._id.toString()) || [];
    const availableProducts = await this.productService.getAvailableProducts({
      clientId,
    });

    const updated = availableProducts.filter(
      (ap) => cartProductsIds.includes(ap._id.toString()) || ap.mandatory,
    );
    await this.clientModel.updateOne(
      { _id: clientId },
      {
        $set: {
          'cart.products': updated,
        },
      },
    );
    return this.calculatePrices({ clientId });
  }

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
        return cartProduct.amount;
      case PriceBase.VEHICLE_POWER:
        return vehiclePower * (cartProduct.amount / 100);
      case (PriceBase.BASE_PRICE, PriceBase.COVERAGES_TOTAL):
        return basePrice * (cartProduct.amount / 100);
      default:
        return 0;
    }
  }

  private getTotalPrice({
    productsWithPrices,
  }: {
    productsWithPrices: CartProduct[];
  }) {
    const coveragePrice = productsWithPrices
      .filter(
        (p) =>
          p.type === ProductType.COVERAGE ||
          p.type === ProductType.SURCHARGE ||
          p.type === ProductType.BASE_COVERAGE,
      )
      .reduce((a, v) => a + v.price, 0);
    const discountPrice = productsWithPrices
      .filter((p) => p.type === ProductType.DISCOUNT)
      .reduce((a, v) => a + v.price, 0);

    const totalPrice = coveragePrice - discountPrice;
    return totalPrice;
  }
  private async calculatePrices({ clientId }: { clientId: ObjectId }) {
    const client = await this.clientModel.findOne({ _id: clientId });

    const cartProducts = client.cart.products;
    const vehiclePower = client.vehiclePower;
    const baseCoverage = cartProducts.find(
      (cp) => cp.type === ProductType.BASE_COVERAGE,
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
              p.type === ProductType.BASE_COVERAGE,
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
    const totalPrice = this.getTotalPrice({ productsWithPrices });
    await this.clientModel.updateOne(
      { _id: clientId },
      {
        $set: {
          'cart.products': productsWithPrices2,
          'cart.totalPrice': totalPrice,
          'cart.basePrice': basePrice,
        },
      },
    );
    return this.clientModel.findOne({ _id: clientId }, { cart: 1 });
  }
}
