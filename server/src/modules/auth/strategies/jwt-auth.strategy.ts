import { ExtractJwt, Strategy } from 'passport-jwt';
import { Types } from 'mongoose';

import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

import { UserService } from 'src/modules/user/user.service';
import { User } from 'src/modules/user/user.schema';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_PRIVATE_KEY,
      ignoreExpiration: false,
    });
  }

  async validate(payload: { _id: string }): Promise<User> {
    return this.userService.userById(new Types.ObjectId(payload._id));
  }
}
