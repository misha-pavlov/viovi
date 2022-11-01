import { Model } from 'mongoose';

import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { ObjectType, Field } from '@nestjs/graphql';

import { CommonSchema } from 'src/common/common.schema';

@ObjectType()
@Schema()
export class User extends CommonSchema {
  @Field(() => String)
  @Prop({ type: String, required: true })
  username: string;

  @Field(() => String)
  @Prop({ type: String, required: true })
  email: string;

  @Prop({ type: String, required: true })
  password: string;

  @Prop({ type: String, required: true })
  image: string;
}

export type UserDocument = User & Document;
export type UserModel = Model<UserDocument>;

export const UserSchema = SchemaFactory.createForClass(User);
