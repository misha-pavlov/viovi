import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { ROOM_ACCESS_ENUM, ROOM_TYPES_ENUM } from 'src/modules/room/room.schema';

import { Room, RoomModel } from './room.schema';
import { User } from '../user/user.schema';
import { Types } from 'mongoose';

@Injectable()
export class RoomService {
  constructor(@InjectModel(Room.name) private roomModel: RoomModel) {}

  async createRoom(user: User): Promise<Room> {
    const type = ROOM_TYPES_ENUM.YOU_TUBE;
    const access = ROOM_ACCESS_ENUM.PUBLIC;
    const videoUrl = 'https://www.youtube.com/watch?v=o5w_c3bvZC8';
    const currTime = 0;
    const isPause = true;
    const members = [user._id];

    return this.roomModel.create({
      type,
      access,
      videoUrl,
      currTime,
      isPause,
      members,
    });
  }

  async getRoomById(roomId: Types.ObjectId, throwError = false): Promise<Room | null> {
    const room = await this.roomModel.findById(roomId);
    if (!room && throwError) throw new Error('Room not found');

    return room;
  }

  async updateRoomPause(roomId: Types.ObjectId, isPause: boolean): Promise<Room> {
    return this.roomModel.findByIdAndUpdate(roomId, { isPause });
  }

  async updateRoomVideoUrl(roomId: Types.ObjectId, videoUrl: string): Promise<Room> {
    return this.roomModel.findByIdAndUpdate(roomId, { videoUrl });
  }

  async updateRoomType(roomId: Types.ObjectId, type: ROOM_TYPES_ENUM): Promise<Room> {
    return this.roomModel.findByIdAndUpdate(roomId, { type });
  }

  async updateRoomCurrTime(roomId: Types.ObjectId, currTime: number): Promise<Room> {
    return this.roomModel.findByIdAndUpdate(roomId, { currTime });
  }

  async addRoomMember(roomId: Types.ObjectId, userId: string): Promise<Room | null> {
    const room = await this.roomModel.findById(roomId);

    if (room.members.includes(userId)) {
      return null;
    }

    return this.roomModel.findByIdAndUpdate(roomId, { members: [...room.members, userId] });
  }

  async removeRoomMember(roomId: Types.ObjectId, userId: string): Promise<Room> {
    const room = await this.roomModel.findById(roomId);
    const newRoomMembers = room.members.filter(m => m !== userId);
    return this.roomModel.findByIdAndUpdate(roomId, { members: newRoomMembers });
  }
}
