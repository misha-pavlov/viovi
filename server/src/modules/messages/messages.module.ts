import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { MessagesResolver } from './messages.resolver';
import { MessagesService } from './messages.service';
import { MessagesSchema, Messages } from './messages.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Messages.name, schema: MessagesSchema }])],
  providers: [MessagesResolver, MessagesService],
  exports: [MessagesService],
})
export class MessagesModule {}
