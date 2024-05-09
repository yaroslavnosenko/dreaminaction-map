import { AuthInput } from '@/inputs'
import { User } from '@/models'
import { Arg, Mutation, Query, Resolver } from 'type-graphql'

@Resolver(() => User)
export class UserResolver {
  @Query(() => [User])
  users(): Promise<User[]> {
    return User.find()
  }

  @Query(() => User, { nullable: true })
  async user(@Arg('id') id: string): Promise<User | null> {
    return User.findOneBy({ id })
  }

  @Mutation(() => String)
  async auth(@Arg('input') input: AuthInput): Promise<string> {
    return input.token
  }
}
