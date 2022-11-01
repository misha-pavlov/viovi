import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Types } from 'mongoose';

@ObjectType()
export class UserPayload {
  @Field(() => Types.ObjectId)
  _id: Types.ObjectId;

  @Field(() => String)
  username: string;

  @Field(() => String)
  email: string;

  @Field(() => String)
  password: string;

  @Field(() => String)
  image: string;
}

@InputType()
export class UserPayloadInput {
  @Field(() => Types.ObjectId)
  _id: Types.ObjectId;

  @Field(() => String)
  username: string;

  @Field(() => String)
  email: string;

  @Field(() => String)
  password: string;

  @Field(() => String)
  image: string;
}
