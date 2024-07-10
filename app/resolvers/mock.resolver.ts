import { Feature, Place, User } from '@/models'
import { features, places, users } from '@mocks'
import { Mutation } from 'type-graphql'

export class MockResolver {
  @Mutation(() => Boolean)
  async mock(): Promise<boolean> {
    for (const user of users) {
      await User.create({ ...user }).save()
    }
    for (const place of places) {
      await Place.create({ ...place }).save()
    }
    for (const feature of features) {
      await Feature.create({ ...feature }).save()
    }
    return true
  }
}
