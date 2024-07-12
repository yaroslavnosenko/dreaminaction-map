import { Category } from '@/enums'
import { Field, Float, InputType } from 'type-graphql'

@InputType()
export class PlaceInput {
  @Field(() => Category)
  category: Category

  @Field(() => String)
  name: string

  @Field(() => String)
  address: string

  @Field(() => String, { nullable: true })
  description?: string

  @Field(() => Float)
  lat: number

  @Field(() => Float)
  lng: number
}
