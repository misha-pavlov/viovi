import { Document, Model } from 'mongoose';

import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

import { CommonSchema } from 'src/common/common.schema';

export enum ROOM_ACCESS_ENUM {
  PUBLIC = 'PUBLIC',
  PRIVATE = 'PRIVATE',
}

export enum ROOM_TYPES_ENUM {
  YOU_TUBE = 'YOU_TUBE',
  SHARING_SCREEN = 'SHARING_SCREEN',
}
@ObjectType()
@Schema()
export class Room extends CommonSchema {
  @Field(() => ROOM_TYPES_ENUM)
  @Prop({ type: String, enum: ROOM_TYPES_ENUM, required: true })
  type: ROOM_TYPES_ENUM;

  @Field(() => ROOM_ACCESS_ENUM)
  @Prop({ type: String, enum: ROOM_ACCESS_ENUM, required: true })
  access: ROOM_ACCESS_ENUM;

  @Field(() => String)
  @Prop({ type: String, required: true, default: '' })
  videoUrl: string;

  @Field(() => Number)
  @Prop({ type: Number, required: true, default: 0 })
  currTime: number;

  @Field(() => Boolean)
  @Prop({ type: Boolean, required: true, default: true })
  isPause: boolean;

  @Field(() => [String])
  @Prop({ type: [String], required: true, default: [] })
  members: string[];
}

registerEnumType(ROOM_TYPES_ENUM, { name: 'ROOM_TYPES_ENUM' });
registerEnumType(ROOM_ACCESS_ENUM, { name: 'ROOM_ACCESS_ENUM' });

export type RoomDocument = Room & Document;
export type RoomModel = Model<RoomDocument>;

export const RoomSchema = SchemaFactory.createForClass(Room);
