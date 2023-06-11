import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Client } from 'src/clients/clients.schema';
import { ProductsService } from 'src/products/products.service';
import { ObjectId } from 'mongodb';
import { ToggleProductInput } from './dtos/toggleProductInput';
import { CalculationService } from './calculation.service';

@Injectable()
export class CartService {
  constructor(
    @InjectModel(Client.name) private clientModel: Model<Client>,
    private productService: ProductsService,
    private calculationService: CalculationService
  ) {}

  async toggleProduct(input: ToggleProductInput) {
    const { clientId, productId } = input;
    const client = await this.clientModel.findById(
      { _id: clientId },
      { cart: 1 }
    );
    const product = client.cart.products.find(
      (p) => p._id.toString() === productId.toString()
    );

    const r = await this.clientModel.updateOne(
      { _id: clientId },
      {
        $pull: {
          'cart.products': product,
        },
      }
    );
    if (r.acknowledged === false) {
      await this.clientModel.updateOne(
        { _id: clientId },
        {
          $addToSet: {
            'cart.products': { _id: productId },
          },
        }
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
      (ap) => cartProductsIds.includes(ap._id.toString()) || ap.mandatory
    );
    await this.clientModel.updateOne(
      { _id: clientId },
      {
        $set: {
          'cart.products': updated,
        },
      }
    );
    return this.calculationService.calculatePrices({ clientId });
  }
}
