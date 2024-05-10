import { getProviderUser, signToken } from '@/auth'
import { config } from '@/config'
import { UserRole } from '@/enums'
import { AuthInput } from '@/inputs'
import { User } from '@/models'
import { Arg, Mutation } from 'type-graphql'

export class AuthResolver {
  @Mutation(() => String)
  async auth(@Arg('input') input: AuthInput): Promise<string> {
    const { email, ...other } = await getProviderUser(input)
    let user = await User.findOneBy({ email })
    if (user) {
      return signToken({ uid: user.id })
    }

    const role = email === config.admin.email ? UserRole.admin : UserRole.user
    user = await User.create({ email, ...other, role }).save()
    return signToken({ uid: user.id })
  }
}
