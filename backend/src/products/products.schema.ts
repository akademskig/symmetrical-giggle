import {
  Field,
  Float,
  ID,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';

export enum ProductType {
  DISCOUNT,
  COVERAGE,
  SURCHARGE,
  BASE_COVERAGE,
}
export enum PriceBase {
  BASE_PRICE,
  VEHICLE_POWER,
  FIXED_PRICE,
  TOTAL_PRICE,
  COVERAGES_TOTAL,
}
registerEnumType(ProductType, {
  name: 'ProductTypes',
});
registerEnumType(PriceBase, {
  name: 'PriceBase',
});

@ObjectType()
export class ValidForLimits {
  @Field(() => Number, { nullable: true })
  min: number;
  @Field(() => Number, { nullable: false })
  max: number;
}

@ObjectType()
export class ValidFor {
  @Field(() => ValidForLimits, { nullable: true })
  @Prop({ type: ValidForLimits })
  age: { min?: number; max?: number };

  @Field(() => ValidForLimits, { nullable: true })
  @Prop({ type: ValidForLimits })
  vehiclePower: { min?: number; max?: number };

  @Field(() => ValidForLimits, { nullable: true })
  @Prop({ type: ValidForLimits })
  coverageAmount: { min?: number; max?: number };

  @Field(() => [String], { nullable: true })
  @Prop({ type: [String] })
  cities: string[];
}

@ObjectType()
export class Price {
  @Field(() => ValidFor, { nullable: true })
  @Prop({ required: false })
  validFor: ValidFor;

  @Field(() => Float, { nullable: false })
  @Prop({ required: true })
  amount: number;
}

@Schema()
@ObjectType()
export class Product {
  @Field(() => ID)
  _id: ObjectId;

  @Field(() => String, { nullable: false })
  @Prop({ required: true })
  name: string;

  @Field(() => ProductType, { nullable: false })
  @Prop({ required: true })
  type: ProductType;

  @Field(() => [Price], { nullable: false })
  @Prop({ required: true })
  prices: Price[];

  @Field(() => PriceBase, { nullable: false })
  @Prop({ required: true })
  priceBase: PriceBase;

  @Field(() => Boolean, { nullable: true })
  @Prop()
  mandatory: boolean;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
ProductSchema.index({ name: 1, type: 1, 'price.amount': 1 }, { unique: true });
ProductSchema.index({ name: 1 });
