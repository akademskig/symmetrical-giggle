import { Module } from '@nestjs/common';
import { CustomerResolver } from './customer.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Customer, CustomerSchema } from './customer.schema';
import { CustomerService } from './customer.service';
import { ProductsService } from 'src/products/products.service';
import { Product, ProductSchema } from 'src/products/products.schema';
import { CartService } from 'src/cart/cart.service';
import { CalculationService } from 'src/cart/calculation.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Customer.name, schema: CustomerSchema }]),
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
  ],
  providers: [
    CustomerResolver,
    CustomerService,
    ProductsService,
    CartService,
    CalculationService,
  ],
})
export class CustomerModule {}
