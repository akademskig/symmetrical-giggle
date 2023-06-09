import { Module } from '@nestjs/common';
import { SeederService } from './seeder.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from 'src/products/products.schema';
import mongooseModule from '..';

@Module({
  imports: [
    mongooseModule,
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
  ],
  providers: [SeederService],
})
export class SeederModule {}
