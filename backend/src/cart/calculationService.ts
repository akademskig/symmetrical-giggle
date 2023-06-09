import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from 'src/products/products.schema';

@Injectable()
export class CalculationService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}
  async calculatePrice(data: Product[]) {
    console.log(data);
  }
}
