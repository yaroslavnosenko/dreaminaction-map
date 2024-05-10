import { signToken } from '@/auth'
import { AuthInput } from '@/inputs'
import { AppContext } from '@/types'
import { Arg, Ctx, Mutation } from 'type-graphql'

export class AuthResolver {
  @Mutation(() => String)
  async auth(
    @Arg('input') input: AuthInput,
    @Ctx() context: AppContext
  ): Promise<string> {
    console.log(context)
    return signToken({ uid: '1' })
  }
}
