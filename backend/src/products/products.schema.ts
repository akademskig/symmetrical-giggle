import {
  Field,
  Float,
  ID,
  Int,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';
import { Types } from 'mongoose';

export enum ProductType {
  DISCOUNT,
  COVERAGE,
  SURCHARGE,
  BASE_COVERAGE,
}
export enum Currency {
  EUR,
}
export enum PriceBase {
  BASE_PRICE,
  VEHICLE_POWER,
  FIXED_PRICE,
  TOTAL_PRICE,
  COVERAGES_TOTAL,
}
registerEnumType(ProductType, {
  name: 'ProductType',
});
registerEnumType(PriceBase, {
  name: 'PriceBase',
});
registerEnumType(Currency, {
  name: 'Currency',
});

@Schema()
@ObjectType()
export class ValidFor {
  @Field(() => Int, { nullable: true })
  @Prop({ type: Number })
  ageMin: number;

  @Field(() => Int, { nullable: true })
  @Prop({ type: Number })
  ageMax: number;

  @Field(() => Int, { nullable: true })
  @Prop({ type: Number })
  vehiclePowerMin: number;

  @Field(() => Int, { nullable: true })
  @Prop({ type: Number })
  coverageAmountMin: number;

  @Field(() => [String], { nullable: true })
  @Prop({ type: [String] })
  cities: string[];
}
const ValidForSchema = SchemaFactory.createForClass(ValidFor);

@Schema()
@ObjectType()
export class Price {
  @Field(() => ValidFor, { nullable: true })
  @Prop({ type: ValidForSchema, required: false })
  validFor: ValidFor;

  @Field(() => Float, { nullable: false })
  @Prop({ type: Number, required: true })
  amount: number;
}
const PriceSchema = SchemaFactory.createForClass(Price);
@Schema()
@ObjectType()
export class Product {
  @Field(() => ID)
  _id: ObjectId;

  @Field(() => String)
  @Prop({ type: String, required: true })
  name: string;

  @Field(() => Currency)
  @Prop({ type: Number, enum: Currency, required: true })
  currency: Currency;

  @Field(() => ProductType)
  @Prop({ type: Number, enum: ProductType, required: true })
  type: ProductType;

  @Field(() => [Price], { nullable: false })
  @Prop({ type: [PriceSchema], required: true })
  prices: Price[];

  @Field(() => PriceBase, { nullable: false })
  @Prop({ type: Number, enum: PriceBase, required: true })
  priceBase: PriceBase;

  @Field(() => Boolean, { nullable: true })
  @Prop({ type: Boolean })
  mandatory: boolean;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
ProductSchema.index({ name: 1, type: 1, 'price.amount': 1 }, { unique: true });
ProductSchema.index({ name: 1 });
