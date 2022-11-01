import { Resolver, Query } from '@nestjs/graphql';

@Resolver()
export class AppResolver {
  @Query(() => String)
  async Hello(): Promise<string> {
    return 'Hello';
  }
}
