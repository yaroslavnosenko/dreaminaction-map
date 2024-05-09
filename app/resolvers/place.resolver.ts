import { Place } from '@/models'
import { Arg, Query, Resolver } from 'type-graphql'

@Resolver(() => Place)
export class PlaceResolver {
  @Query(() => [Place])
  places(): Promise<Place[]> {
    return Place.find()
  }

  @Query(() => Place, { nullable: true })
  place(@Arg('id') id: string): Promise<Place | null> {
    return Place.findOneBy({ id })
  }
}
