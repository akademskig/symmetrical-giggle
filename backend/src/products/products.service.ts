import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductType } from './products.schema';
import { Model } from 'mongoose';
import { GetAvailableProductsInput } from './dtos/getAvailableProducts.input';
import * as moment from 'moment';
import { Customer } from 'src/customer/customer.schema';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
    @InjectModel(Customer.name) private customerModel: Model<Customer>
  ) {}
  async getAvailableProducts(
    getAvailableProductsInput: GetAvailableProductsInput
  ): Promise<Product[]> {
    const { customerId } = getAvailableProductsInput;
    const customer = await this.customerModel.findById(customerId);
    if (!customer) {
      return [];
    }
    const { birthDate, cart, city, vehiclePower } = customer;
    const selectedProductsIds = (cart.products || []).map((p) => p._id);
    const coveragesCount = await this.productModel
      .find({
        $and: [
          { _id: { $in: selectedProductsIds } },
          { type: ProductType.COVERAGE },
        ],
      })
      .count();

    const birthDateMoment = moment(birthDate);
    const age = moment().diff(birthDateMoment, 'y');
    const products = await this.productModel.aggregate([
      { $unwind: { path: '$prices', preserveNullAndEmptyArrays: true } },
      {
        $match: {
          $or: [
            { 'prices.validFor': { $exists: false } },
            {
              $and: [
                { 'prices.validFor': { $exists: true } },
                {
                  $and: [
                    {
                      $or: [
                        { 'prices.validFor.ageMin': { $exists: false } },
                        { 'prices.validFor.ageMin': { $lte: age } },
                      ],
                    },
                    {
                      $or: [
                        { 'prices.validFor.cities': { $exists: false } },
                        {
                          'prices.validFor.cities': {
                            $elemMatch: {
                              $in: [city, '$prices.validFor.cities'],
                            },
                          },
                        },
                      ],
                    },
                    {
                      $or: [
                        { 'prices.validFor.ageMax': { $exists: false } },
                        { 'prices.validFor.ageMax': { $lte: age } },
                      ],
                    },
                    {
                      $or: [
                        {
                          'prices.validFor.vehiclePowerMin': { $exists: false },
                        },
                        {
                          'prices.validFor.vehiclePowerMin': {
                            $lt: vehiclePower,
                          },
                        },
                      ],
                    },
                    {
                      $or: [
                        {
                          'prices.validFor.coverageAmountMin': {
                            $exists: false,
                          },
                        },
                        {
                          'prices.validFor.coverageAmountMin': {
                            $lte: coveragesCount,
                          },
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      },
      {
        $group: {
          _id: '$_id',
          amount: { $min: '$prices.amount' },
          name: { $first: '$name' },
          type: { $first: '$type' },
          priceBase: { $first: '$priceBase' },
          mandatory: { $first: '$mandatory' },
          currency: { $first: '$currency' },
        },
      },
      {
        $sort: { name: 1 },
      },
    ]);
    return products;
  }
}
