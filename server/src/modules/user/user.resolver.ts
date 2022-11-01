import { Args, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { Types } from 'mongoose';

import { User } from './user.schema';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { ContextUser } from '../../decorators/context-user.decorator';
import { UserPayload } from '../../object-types/user-payload.object-type';
import { UserService } from './user.service';

@Resolver()
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => UserPayload)
  @UseGuards(JwtAuthGuard)
  async GetUser(@ContextUser() user: User): Promise<UserPayload> {
    return user;
  }

  @Query(() => [User])
  async usersByIds(
    @Args({ name: 'ids', type: () => [Types.ObjectId] }) ids: Types.ObjectId[]
  ): Promise<User[]> {
    return this.userService.usersByIds(ids);
  }
}
