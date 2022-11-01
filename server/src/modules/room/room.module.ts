import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { RoomResolver } from './room.resolver';
import { RoomService } from './room.service';
import { RoomSchema, Room } from './room.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Room.name, schema: RoomSchema }])],
  providers: [RoomResolver, RoomService],
  exports: [RoomService],
})
export class RoomModule {}
