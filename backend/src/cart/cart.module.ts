import { Module } from '@nestjs/common';
import { CartResolver } from './cart.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Customer, CustomerSchema } from 'src/customer/customer.schema';
import { CartService } from './cart.service';
import { ProductsService } from 'src/products/products.service';
import { Product, ProductSchema } from 'src/products/products.schema';
import { CalculationService } from './calculation.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Customer.name, schema: CustomerSchema },
    ]),
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
  ],
  providers: [CartResolver, CartService, ProductsService, CalculationService],
})
export class CartModule {}
