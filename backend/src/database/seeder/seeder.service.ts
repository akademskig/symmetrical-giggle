import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from 'src/products/products.schema';
import { products } from './data';

@Injectable()
export class SeederService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>
  ) {}
  async seedDb() {
    const models = await Promise.all(
      products.map((p) => this.productModel.create(p))
    );
    await this.productModel.insertMany(models);
  }
  async clearDb() {
    await this.productModel.deleteMany({});
  }
}
