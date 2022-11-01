import { Types } from 'mongoose';

import { Prop, Schema } from '@nestjs/mongoose';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Schema()
export class CommonSchema {
  @Field(() => Types.ObjectId)
  _id: Types.ObjectId;

  @Field(() => Date)
  @Prop({ type: Date, default: new Date(), required: true })
  createdAt: Date;

  @Field(() => Boolean)
  @Prop({ type: Boolean, default: false, required: true })
  deleted: boolean;
}

export type CommonFields = '_id' | 'createdAt' | 'deleted';
