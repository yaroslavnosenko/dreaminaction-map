import { AuthProvider } from '@/enums'
import { Field, InputType } from 'type-graphql'

@InputType()
export class AuthInput {
  @Field(() => String)
  token: string

  @Field(() => AuthProvider)
  provider: AuthProvider
}
