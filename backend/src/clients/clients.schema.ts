import { Field, Float, ID, Int, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';
import { PriceBase, ProductType } from 'src/products/products.schema';

@ObjectType()
export class CartProduct {
  @Field(() => ID, { nullable: false })
  _id: ObjectId;

  @Field(() => Float, { defaultValue: 0 })
  amount: number;

  @Field(() => PriceBase, { nullable: false })
  priceBase: PriceBase;

  @Field(() => Float, { defaultValue: 0 })
  price: number;

  @Field(() => String, { nullable: false })
  name: string;

  @Field(() => ProductType, { nullable: false })
  type: ProductType;
}

@ObjectType()
export class Cart {
  @Field(() => [CartProduct], { defaultValue: [] })
  products: CartProduct[];

  @Field(() => Float, { defaultValue: 0 })
  basePrice: number;

  @Field(() => Float, { defaultValue: 0 })
  totalPrice: number;
}

@Schema()
@ObjectType()
export class Client {
  @Field(() => ID, { nullable: false })
  _id: ObjectId;

  @Field(() => String, { nullable: false })
  @Prop({ required: true })
  name: string;

  @Field(() => String, { nullable: false })
  @Prop({ required: true })
  birthDate: Date;

  @Field(() => String, { nullable: false })
  @Prop({ required: true })
  city: string;

  @Field(() => Int, { nullable: false })
  @Prop({ required: true })
  vehiclePower: number;

  @Field(() => Cart)
  @Prop({ default: new Cart() })
  cart: Cart;
}

export const ClientSchema = SchemaFactory.createForClass(Client);
ClientSchema.index({ name: 1 }, { unique: true });
