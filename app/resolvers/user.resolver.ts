import { User } from '@/models'
import { users } from '@mocks'
import { Query, Resolver } from 'type-graphql'

@Resolver()
export class UserResolver {
  @Query(() => User, { nullable: true })
  async user(): Promise<User | null> {
    return users.at(0) || null
  }
}
