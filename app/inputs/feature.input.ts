import { Field, InputType } from 'type-graphql'

@InputType()
export class FeatureInput {
  @Field(() => String)
  name: string
}
