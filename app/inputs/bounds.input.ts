import { Field, Float, InputType } from 'type-graphql'

@InputType()
export class BoundsInput {
  @Field(() => Float)
  neLat: number
  @Field(() => Float)
  neLng: number

  @Field(() => Float)
  swLat: number
  @Field(() => Float)
  swLng: number
}
