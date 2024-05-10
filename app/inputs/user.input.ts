import { Field, InputType } from 'type-graphql'

@InputType()
export class UserInput {
  @Field(() => String)
  firstName: string

  @Field(() => String)
  lastName: string
}
