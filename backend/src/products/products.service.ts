import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductType } from './products.schema';
import { Model } from 'mongoose';
import { GetAvailableProductsInput } from './dtos/getAvailableProducts.input';
import * as moment from 'moment';
import { Client } from 'src/clients/clients.schema';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
    @InjectModel(Client.name) private clientModel: Model<Client>,
  ) {}
  async getAvailableProducts(
    getAvailableProductsInput: GetAvailableProductsInput,
  ): Promise<Product[]> {
    const { clientId } = getAvailableProductsInput;
    const client = await this.clientModel.findById(clientId);
    if (!client) {
      return [];
    }
    const { birthDate, cart, city, vehiclePower } = client;
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
                  $or: [
                    {
                      'prices.validFor.age.min': { $lte: age },
                    },
                    {
                      'prices.validFor.age.max': { $gt: age },
                    },
                    {
                      $and: [
                        {
                          'prices.validFor.cities': {
                            $elemMatch: {
                              $in: [city, '$prices.validFor.cities'],
                            },
                          },
                        },
                        {
                          'prices.validFor.age.min': { $lte: age },
                        },
                      ],
                    },
                    {
                      'prices.validFor.vehiclePower.min': { $lt: vehiclePower },
                    },
                    {
                      'prices.validFor.coverageAmount.min': {
                        $lt: coveragesCount,
                      },
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
