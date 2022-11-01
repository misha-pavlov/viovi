import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserService } from 'src/modules/user/user.service';
import { AuthPayload } from 'src/object-types/auth-payload.object-type';
import { User } from 'src/modules/user/user.schema';

import { SignUpInput } from './inputs/sign-up.input';
import { SignInInput } from './inputs/sign-in.input';
import { CATS_MEMES_IMAGE_URLS } from './static/images';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService, private userService: UserService) {}

  async generateToken(user: User): Promise<string> {
    return this.jwtService.sign({ _id: user._id });
  }

  async signUp(input: SignUpInput): Promise<AuthPayload> {
    const randomNumber = Math.floor(Math.random() * 10);
    const image = CATS_MEMES_IMAGE_URLS[randomNumber];
    const user = await this.userService.createUser({ ...input, image });

    return { token: await this.generateToken(user) };
  }

  async signIn(input: SignInInput): Promise<AuthPayload> {
    const user = await this.userService.validateUser(input);

    return { token: await this.generateToken(user) };
  }
}
