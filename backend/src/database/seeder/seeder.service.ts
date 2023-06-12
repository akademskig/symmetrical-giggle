import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from 'src/products/products.schema';
import { products } from './data';
import { DeleteResult } from 'mongodb';

@Injectable()
export class SeederService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>
  ) {}
  async seedDb() {
    const models = await Promise.all(
      products.map((p) => this.productModel.create(p))
    );
    return Promise.all(models.map((m) => m.save()));
  }
  async clearDb(): Promise<DeleteResult> {
    return this.productModel.deleteMany();
  }
}
