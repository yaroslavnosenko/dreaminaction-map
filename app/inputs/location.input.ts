import { Field, Float, InputType } from 'type-graphql'

@InputType()
export class LocationInput {
  @Field(() => Float)
  lat: number
  @Field(() => Float)
  lng: number
}
