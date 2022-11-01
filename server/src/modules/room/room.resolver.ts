import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { Types } from 'mongoose';

import { Room, ROOM_TYPES_ENUM } from './room.schema';
import { RoomService } from './room.service';
import { ContextUser } from '../../decorators/context-user.decorator';
import { User } from '../user/user.schema';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';

@Resolver(() => Room)
export class RoomResolver {
  constructor(private roomService: RoomService) {}

  @Query(() => Room)
  async getRoomById(@Args('roomId') roomId: Types.ObjectId): Promise<Room> {
    return this.roomService.getRoomById(roomId);
  }

  @Mutation(() => Room)
  @UseGuards(JwtAuthGuard)
  async createRoom(@ContextUser() user: User): Promise<Room> {
    return this.roomService.createRoom(user);
  }

  @Mutation(() => Room)
  async updateRoomPause(
    @Args('roomId') roomId: Types.ObjectId,
    @Args('isPause') isPause: boolean
  ): Promise<Room> {
    return this.roomService.updateRoomPause(roomId, isPause);
  }

  @Mutation(() => Room)
  async updateRoomVideoUrl(
    @Args('roomId') roomId: Types.ObjectId,
    @Args('videoUrl') videoUrl: string
  ): Promise<Room> {
    return this.roomService.updateRoomVideoUrl(roomId, videoUrl);
  }

  @Mutation(() => Room)
  async updateRoomType(
    @Args('roomId') roomId: Types.ObjectId,
    @Args('type') type: ROOM_TYPES_ENUM
  ): Promise<Room> {
    return this.roomService.updateRoomType(roomId, type);
  }

  @Mutation(() => Room)
  async updateRoomCurrTime(
    @Args('roomId') roomId: Types.ObjectId,
    @Args('currTime') currTime: number
  ): Promise<Room> {
    return this.roomService.updateRoomCurrTime(roomId, currTime);
  }

  @Mutation(() => Room)
  async addRoomMember(
    @Args('roomId') roomId: Types.ObjectId,
    @Args('userId') userId: string
  ): Promise<Room> {
    return this.roomService.addRoomMember(roomId, userId);
  }

  @Mutation(() => Room)
  async removeRoomMember(
    @Args('roomId') roomId: Types.ObjectId,
    @Args('userId') userId: string
  ): Promise<Room> {
    return this.roomService.removeRoomMember(roomId, userId);
  }
}
