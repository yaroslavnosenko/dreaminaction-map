import { OwnerAnd } from '@/auth'
import { ILike } from '@/database'
import { Accessibility, UserRole } from '@/enums'
import { BoundsInput, FeatureAvailabilityInput, PlaceInput } from '@/inputs'
import { Feature, Place, PlaceFeature, User } from '@/models'
import {
  Arg,
  Authorized,
  FieldResolver,
  ID,
  Int,
  Mutation,
  Query,
  Resolver,
  Root,
  UseMiddleware,
} from 'type-graphql'
import { Between, In } from 'typeorm'

@Resolver(() => Place)
export class PlaceResolver {
  @Query(() => [Place], { description: 'Admin and Manager only' })
  @Authorized([UserRole.admin, UserRole.manager])
  places(
    @Arg('query', () => String, { nullable: true }) query?: string,
    @Arg('accessibilities', () => [Accessibility], { nullable: true })
    accessibilities?: Accessibility[]
  ): Promise<Place[]> {
    const baseWhere = { accessibility: In(accessibilities) }
    return query
      ? Place.find({
          where: [
            { ...baseWhere, name: ILike(query) },
            { ...baseWhere, address: ILike(query) },
          ],
          take: 30,
        })
      : Place.find({ where: [baseWhere], take: 30 })
  }

  @Query(() => [Place])
  placesByBounds(@Arg('input') input: BoundsInput): Promise<Place[]> {
    const { swLat, swLng, neLat, neLng } = input
    return Place.find({
      where: [{ lat: Between(swLat, neLat), lng: Between(swLng, neLng) }],
      take: 100,
    })
  }

  @Query(() => Place, { nullable: true })
  place(@Arg('id', () => ID) id: string): Promise<Place | null> {
    return Place.findOneBy({ id })
  }

  @FieldResolver(() => [User])
  @Authorized([UserRole.admin, UserRole.manager])
  async owner(@Root() place: Place): Promise<User> {
    const owner = await place.owner
    return owner
  }

  @FieldResolver(() => Int)
  async featuresCount(@Root() place: Place): Promise<number> {
    return await PlaceFeature.countBy({ placeId: place.id })
  }

  @FieldResolver(() => [Feature])
  async availableFeatures(@Root() place: Place): Promise<Feature[]> {
    const placeFeatures = await PlaceFeature.findBy({
      placeId: place.id,
      available: true,
    })
    const filteredIds = placeFeatures.map((feature) => feature.id)
    return Feature.findBy({ id: In(filteredIds) })
  }

  @FieldResolver(() => [Feature])
  async unavailableFeatures(@Root() place: Place): Promise<Feature[]> {
    const placeFeatures = await PlaceFeature.findBy({
      placeId: place.id,
      available: false,
    })
    const filteredIds = placeFeatures.map((feature) => feature.id)
    return Feature.findBy({ id: In(filteredIds) })
  }

  @Mutation(() => ID, { description: 'Admin and Owner only' })
  @Authorized()
  @UseMiddleware(OwnerAnd([UserRole.admin]))
  async createPlace(
    @Arg('userId', () => ID) userId: string,
    @Arg('input') input: PlaceInput
  ): Promise<string> {
    const user = await User.findOneByOrFail({ id: userId })
    const place = Place.create({ ...input })
    place.owner = Promise.resolve(user)
    const { id } = await place.save()
    return id
  }

  @Mutation(() => ID, { description: 'Admin and Owner only' })
  @Authorized()
  @UseMiddleware(OwnerAnd([UserRole.admin]))
  async updatePlace(
    @Arg('id', () => ID) id: string,
    @Arg('input') input: PlaceInput
  ): Promise<string> {
    const place = await Place.findOneByOrFail({ id })
    await Place.create({ ...place, ...input }).save()
    return id
  }

  @Mutation(() => Boolean, { description: 'Admin and Owner only' })
  @Authorized()
  @UseMiddleware(OwnerAnd([UserRole.admin]))
  async deletePlace(@Arg('id', () => ID) id: string): Promise<boolean> {
    const place = await Place.findOneByOrFail({ id })
    await place.remove()
    return true
  }

  @Mutation(() => Accessibility, { description: 'Admin and Manager only' })
  @Authorized([UserRole.admin, UserRole.manager])
  async updatePlaceAccessibility(
    @Arg('id', () => ID) id: string,
    @Arg('accessibility', () => Accessibility)
    accessibility: Accessibility
  ): Promise<number> {
    const place = await Place.findOneByOrFail({ id })
    place.accessibility = accessibility
    await place.save()
    return accessibility
  }

  @Mutation(() => ID, { description: 'Admin only' })
  @Authorized([UserRole.admin])
  async updatePlaceOwner(
    @Arg('id', () => ID) id: string,
    @Arg('userId', () => ID) userId: string
  ): Promise<string> {
    const place = await Place.findOneByOrFail({ id })
    const user = await User.findOneByOrFail({ id: userId })
    place.owner = Promise.resolve(user)
    await place.save()
    return userId
  }

  @Mutation(() => Boolean, { description: 'Admin and Manager only' })
  @Authorized([UserRole.admin, UserRole.manager])
  async updatePlaceFeatures(
    @Arg('id', () => ID) id: string,
    @Arg('input', () => [FeatureAvailabilityInput])
    input: FeatureAvailabilityInput[]
  ): Promise<boolean> {
    // TODO implement
    return true
  }
}
