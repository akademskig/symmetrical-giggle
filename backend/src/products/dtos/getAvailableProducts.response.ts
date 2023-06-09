import { Field, Float, ObjectType } from '@nestjs/graphql';
import { Product } from '../products.schema';

@ObjectType()
export class GetAvailableProductsResponse extends Product {
  @Field(() => Float)
  amount: number;
}
