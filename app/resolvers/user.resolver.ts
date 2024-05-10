import { UserRole } from '@/enums'
import { UserInput } from '@/inputs'
import { User } from '@/models'
import { Arg, ID, Mutation, Query, Resolver } from 'type-graphql'

@Resolver(() => User)
export class UserResolver {
  @Query(() => [User])
  users(): Promise<User[]> {
    return User.find()
  }

  @Query(() => User, { nullable: true })
  async user(@Arg('id', () => ID) id: string): Promise<User | null> {
    return User.findOneBy({ id })
  }

  @Mutation(() => ID)
  async updateUser(
    @Arg('id', () => ID) id: string,
    @Arg('input') input: UserInput
  ): Promise<string> {
    const user = await User.findOneByOrFail({ id })
    await User.create({ ...user, ...input }).save()
    return id
  }

  @Mutation(() => Boolean)
  async deleteUser(@Arg('id', () => ID) id: string): Promise<boolean> {
    const user = await User.findOneByOrFail({ id })
    await user.remove()
    return true
  }

  @Mutation(() => UserRole)
  async updateUserRole(
    @Arg('id', () => ID) id: string,
    @Arg('role', () => UserRole) role: UserRole
  ): Promise<UserRole> {
    const user = await User.findOneByOrFail({ id })
    user.role = role
    await user.save()
    return role
  }
}
