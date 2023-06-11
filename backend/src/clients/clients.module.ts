import { Module } from '@nestjs/common';
import { ClientsResolver } from './clients.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Client, ClientSchema } from './clients.schema';
import { ClientsService } from './clients.service';
import { ProductsService } from 'src/products/products.service';
import { Product, ProductSchema } from 'src/products/products.schema';
import { CartService } from 'src/cart/cart.service';
import { CalculationService } from 'src/cart/calculation.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Client.name, schema: ClientSchema }]),
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
  ],
  providers: [
    ClientsResolver,
    ClientsService,
    ProductsService,
    CartService,
    CalculationService,
  ],
})
export class ClientsModule {}
