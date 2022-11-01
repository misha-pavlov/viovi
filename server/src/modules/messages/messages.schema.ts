import { Document, Model } from 'mongoose';

import { Field, ObjectType } from '@nestjs/graphql';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

import { CommonSchema } from 'src/common/common.schema';
import { UserPayload } from '../../object-types/user-payload.object-type';

@ObjectType()
@Schema()
export class Messages extends CommonSchema {
  @Field(() => UserPayload)
  @Prop({ type: UserPayload, required: true })
  from: UserPayload;

  @Field(() => String)
  @Prop({ type: String, required: true })
  message: string;

  @Field(() => String)
  @Prop({ type: String, required: true })
  roomId: string;

  @Field(() => Date)
  @Prop({ type: Date, required: true })
  createdDate: string;
}

@ObjectType()
export class MessagesWithHasMore {
  @Field(() => [Messages])
  messages: Messages[];

  @Field(() => Boolean)
  hasMore: boolean;
}

export type MessagesDocument = Messages & Document;
export type MessagesModel = Model<MessagesDocument>;

export const MessagesSchema = SchemaFactory.createForClass(Messages);
