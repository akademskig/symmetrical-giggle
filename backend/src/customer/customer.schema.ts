import { Field, Float, ID, Int, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';
import { Currency, PriceBase, ProductType } from 'src/products/products.schema';

@ObjectType()
export class CartProduct {
  @Field(() => ID, { nullable: false })
  _id: ObjectId;

  @Field(() => Float, { defaultValue: 0 })
  @Prop({ type: Number, default: 0 })
  amount: number;

  @Field(() => PriceBase, { nullable: false })
  @Prop({ type: Number, enum: PriceBase, required: true })
  priceBase: PriceBase;

  @Field(() => Float, { defaultValue: 0 })
  @Prop({ type: Number, default: 0 })
  price: number;

  @Field(() => String, { nullable: false })
  @Prop({ type: String, required: true })
  name: string;

  @Field(() => ProductType, { nullable: false })
  @Prop({ type: Number, enum: ProductType, required: true })
  type: ProductType;

  @Field(() => Currency, { nullable: false })
  @Prop({ type: Number, enum: Currency, required: true })
  currency: Currency;
}

@Schema()
@ObjectType()
export class Cart {
  @Field(() => [CartProduct], { defaultValue: [] })
  @Prop({ type: Array<CartProduct>, default: [] })
  products: CartProduct[];

  @Field(() => Float, { defaultValue: 0 })
  @Prop({ type: Number, default: 0 })
  basePrice: number;

  @Field(() => Float, { defaultValue: 0 })
  @Prop({ type: Number, default: 0 })
  totalPrice: number;
}
export const CartSchema = SchemaFactory.createForClass(Cart);

@Schema()
@ObjectType()
export class Customer {
  @Field(() => ID, { nullable: false })
  _id: ObjectId;

  @Field(() => String, { nullable: false })
  @Prop({ required: true, type: String })
  name: string;

  @Field(() => String, { nullable: false })
  @Prop({ type: Date, required: true })
  birthDate: Date;

  @Field(() => String, { nullable: false })
  @Prop({ type: String, required: true })
  city: string;

  @Field(() => Int, { nullable: false })
  @Prop({ type: Number, required: true })
  vehiclePower: number;

  @Field(() => Int, { defaultValue: 0 })
  @Prop({ type: Number, default: 0 })
  voucher: number;

  @Field(() => Float, { defaultValue: 0 })
  @Prop({ type: Number, default: 0 })
  priceMatch: number;

  @Field(() => Cart)
  @Prop({ type: CartSchema, default: new Cart() })
  cart: Cart;
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);
CustomerSchema.index({ name: 1 }, { unique: true });
