import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class SubmitClientDataInput {
  @Field(() => String, { nullable: false })
  name: string;

  @Field(() => String, { nullable: false })
  city: string;

  @Field(() => Date, { nullable: false })
  birthDate: Date;

  @Field(() => Number, { nullable: false })
  vehiclePower: number;

  @Field(() => Number, { nullable: true })
  voucher: number;

  @Field(() => Number, { nullable: true })
  priceMatch: number;
}
