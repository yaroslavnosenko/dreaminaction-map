import { PlaceType } from '@/enums'
import { Field, Float, InputType } from 'type-graphql'

@InputType()
export class PlaceInput {
  @Field(() => PlaceType)
  type: PlaceType

  @Field(() => String)
  name: string

  @Field(() => Float)
  lat: number

  @Field(() => Float)
  lng: number
}
