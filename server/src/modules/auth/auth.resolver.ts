import { UseGuards } from '@nestjs/common';
import { Args, Query, Mutation, Resolver } from '@nestjs/graphql';

import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { ContextUser } from 'src/decorators/context-user.decorator';
import { AuthPayload } from 'src/object-types/auth-payload.object-type';
import { User } from 'src/modules/user/user.schema';

import { SignInInput } from './inputs/sign-in.input';
import { SignUpInput } from './inputs/sign-up.input';
import { AuthService } from './auth.service';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Query(() => AuthPayload)
  @UseGuards(JwtAuthGuard)
  async Auth(@ContextUser() user: User): Promise<AuthPayload> {
    return { token: await this.authService.generateToken(user) };
  }

  @Mutation(() => AuthPayload)
  async SignUp(@Args('input') input: SignUpInput): Promise<AuthPayload> {
    return this.authService.signUp(input);
  }

  @Mutation(() => AuthPayload)
  async SignIn(@Args('input') input: SignInInput): Promise<AuthPayload> {
    return this.authService.signIn(input);
  }
}
