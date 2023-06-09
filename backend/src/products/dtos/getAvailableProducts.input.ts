import { InputType, Field, ID } from '@nestjs/graphql';
import { ObjectId } from 'mongodb';

@InputType()
export class GetAvailableProductsInput {
  @Field(() => ID, { nullable: false })
  clientId: ObjectId;
}
