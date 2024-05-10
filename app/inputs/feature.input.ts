import { Field, ID, InputType } from 'type-graphql'

@InputType()
export class FeatureInput {
  @Field(() => String)
  name: string
}

@InputType()
export class FeatureAvailabilityInput {
  @Field(() => ID)
  id: string

  @Field(() => Boolean)
  available: boolean
}
