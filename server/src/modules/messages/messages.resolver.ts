import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { Types } from 'mongoose';
import { PubSub } from 'graphql-subscriptions';

import { Messages, MessagesWithHasMore } from './messages.schema';
import { MessagesService } from './messages.service';
import { UserPayloadInput } from '../../object-types/user-payload.object-type';

const pubSub = new PubSub();

@Resolver(() => Messages)
export class MessagesResolver {
  constructor(private messagesService: MessagesService) {}

  @Query(() => MessagesWithHasMore)
  async getMessagesByRoomId(
    @Args('roomId') roomId: Types.ObjectId,
    @Args('limit') limit: number
  ): Promise<MessagesWithHasMore> {
    return this.messagesService.getMessagesByRoomId(roomId, limit);
  }

  @Mutation(() => Messages)
  async insertMessage(
    @Args('roomId') roomId: Types.ObjectId,
    @Args('message') message: string,
    @Args('from') from: UserPayloadInput
  ): Promise<Messages | null> {
    const newMessage = await this.messagesService.insertMessage(roomId, message, from);
    await pubSub.publish('messageAdded', { messageAdded: newMessage });
    return newMessage;
  }

  @Subscription(() => Messages)
  messageAdded() {
    return pubSub.asyncIterator('messageAdded');
  }
}
