import { MeAnd } from '@/auth'
import { UserRole } from '@/enums'
import { UserInput } from '@/inputs'
import { User } from '@/models'
import {
  Arg,
  Authorized,
  ID,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from 'type-graphql'
import { Like } from 'typeorm'

@Resolver(() => User)
export class UserResolver {
  @Query(() => [User], { description: 'Admin and Manager only' })
  @Authorized([UserRole.admin, UserRole.manager])
  users(
    @Arg('query', () => String, { nullable: true }) query?: string
  ): Promise<User[]> {
    return query
      ? User.find({
          where: [
            { email: Like(query) },
            { firstName: Like(query) },
            { lastName: Like(query) },
          ],
          take: 30,
        })
      : User.find({ take: 30 })
  }

  @Query(() => User, {
    nullable: true,
    description: 'Admin, Manager and Me only',
  })
  @Authorized()
  @UseMiddleware(MeAnd([UserRole.admin, UserRole.manager]))
  async user(@Arg('id', () => ID) id: string): Promise<User | null> {
    return User.findOneBy({ id })
  }

  @Mutation(() => ID, { description: 'Admin and Me only' })
  @Authorized()
  @UseMiddleware(MeAnd([UserRole.admin]))
  async updateUser(
    @Arg('id', () => ID) id: string,
    @Arg('input') input: UserInput
  ): Promise<string> {
    const user = await User.findOneByOrFail({ id })
    await User.create({ ...user, ...input }).save()
    return id
  }

  @Mutation(() => Boolean, { description: 'Admin only' })
  @Authorized()
  @UseMiddleware(MeAnd([UserRole.admin]))
  async deleteUser(@Arg('id', () => ID) id: string): Promise<boolean> {
    const user = await User.findOneByOrFail({ id })
    await user.remove()
    return true
  }

  @Mutation(() => UserRole, { description: 'Admin only' })
  @Authorized([UserRole.admin])
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
