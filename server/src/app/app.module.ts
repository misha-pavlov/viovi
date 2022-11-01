import { Module } from '@nestjs/common';

import { AuthModule } from 'src/modules/auth/auth.module';
import { UserModule } from 'src/modules/user/user.module';
import { RoomModule } from 'src/modules/room/room.module';

import { AppConfigModule } from './app-config.module';
import { AppResolver } from './app.resolver';
import { MessagesModule } from '../modules/messages/messages.module';

@Module({
  imports: [AppConfigModule, AuthModule, UserModule, RoomModule, MessagesModule],
  providers: [AppResolver],
})
export class AppModule {}
