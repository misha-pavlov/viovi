import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Types } from 'mongoose';

import { Messages, MessagesModel, MessagesWithHasMore } from './messages.schema';
import { UserPayloadInput } from '../../object-types/user-payload.object-type';

@Injectable()
export class MessagesService {
  constructor(@InjectModel(Messages.name) private messagesModel: MessagesModel) {}

  async insertMessage(
    roomId: Types.ObjectId,
    message: string,
    from: UserPayloadInput
  ): Promise<Messages | null> {
    if (!from || !roomId) {
      return null;
    }

    return this.messagesModel.create({ roomId, message, from, createdDate: new Date() });
  }

  async getMessagesByRoomId(roomId: Types.ObjectId, limit: number): Promise<MessagesWithHasMore> {
    if (!roomId) {
      return {
        messages: [],
        hasMore: false,
      };
    }

    const allMessagesLength = await this.messagesModel.find({ roomId: { $in: roomId } }).count();

    return {
      messages: await this.messagesModel
        .find({ roomId: { $in: roomId } })
        .sort({ createdDate: -1 })
        .limit(limit),
      hasMore: limit < allMessagesLength,
    };
  }
}
