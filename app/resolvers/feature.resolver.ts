import { UserRole } from '@/enums'
import { FeatureInput } from '@/inputs'
import { Feature } from '@/models'
import { Arg, Authorized, ID, Mutation, Query, Resolver } from 'type-graphql'

@Resolver(() => Feature)
export class FeatureResolver {
  @Query(() => [Feature])
  features(): Promise<Feature[]> {
    return Feature.find()
  }

  @Mutation(() => ID, { description: 'Admin only' })
  @Authorized([UserRole.admin])
  async createFeature(@Arg('input') input: FeatureInput): Promise<string> {
    const { id } = await Feature.create({ ...input }).save()
    return id
  }

  @Mutation(() => ID, { description: 'Admin only' })
  @Authorized([UserRole.admin])
  async updateFeature(
    @Arg('id', () => ID) id: string,
    @Arg('input') input: FeatureInput
  ): Promise<string> {
    const feature = await Feature.findOneByOrFail({ id })
    await Feature.create({ ...feature, ...input }).save()
    return id
  }

  @Mutation(() => Boolean, { description: 'Admin only' })
  @Authorized([UserRole.admin])
  async deleteFeature(@Arg('id', () => ID) id: string): Promise<boolean> {
    const feature = await Feature.findOneByOrFail({ id })
    await Feature.remove(feature)
    return true
  }
}
