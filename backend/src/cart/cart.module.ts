import { Module } from '@nestjs/common';
import { CartResolver } from './cart.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Client, ClientSchema } from 'src/clients/clients.schema';
import { CartService } from './cart.service';
import { ProductsService } from 'src/products/products.service';
import { Product, ProductSchema } from 'src/products/products.schema';
import { CalculationService } from './calculation.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Client.name, schema: ClientSchema }]),
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
  ],
  providers: [CartResolver, CartService, ProductsService, CalculationService],
})
export class CartModule {}
