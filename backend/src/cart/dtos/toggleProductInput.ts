import { InputType, Field, ID } from '@nestjs/graphql';
import { ObjectId } from 'mongodb';

@InputType()
export class ToggleProductInput {
  @Field(() => ID, { nullable: false })
  clientId: ObjectId;

  @Field(() => ID, { nullable: false })
  productId: ObjectId;
}
