import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Customer } from 'src/customer/customer.schema';
import { ProductsService } from 'src/products/products.service';
import { ObjectId } from 'mongodb';
import { ToggleProductInput } from './dtos/toggleProductInput';
import { CalculationService } from './calculation.service';

@Injectable()
export class CartService {
  constructor(
    @InjectModel(Customer.name) private customerModel: Model<Customer>,
    private productService: ProductsService,
    private calculationService: CalculationService
  ) {}

  async toggleProduct(input: ToggleProductInput) {
    const { customerId, productId } = input;
    const customer = await this.customerModel.findById(
      { _id: customerId },
      { cart: 1 }
    );
    const product = customer.cart.products.find(
      (p) => p._id.toString() === productId.toString()
    );

    const r = await this.customerModel.updateOne(
      { _id: customerId },
      {
        $pull: {
          'cart.products': product,
        },
      }
    );
    if (r.acknowledged === false) {
      await this.customerModel.updateOne(
        { _id: customerId },
        {
          $addToSet: {
            'cart.products': { _id: productId },
          },
        }
      );
    }
    return this.updateSelectedProducts(input);
  }
  async updateSelectedProducts({ customerId }: { customerId: ObjectId }) {
    const customer = await this.customerModel.findOne({ _id: customerId });
    const cartProductsIds =
      customer?.cart.products?.map((p) => p._id.toString()) || [];
    const availableProducts = await this.productService.getAvailableProducts({
      customerId,
    });
    const updated = availableProducts.filter(
      (ap) => cartProductsIds.includes(ap._id.toString()) || ap.mandatory
    );
    await this.customerModel.updateOne(
      { _id: customerId },
      {
        $set: {
          'cart.products': updated,
        },
      }
    );
    return this.calculationService.calculatePrices({ customerId });
  }
}
