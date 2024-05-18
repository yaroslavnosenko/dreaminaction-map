import { OwnerAnd } from '@/auth'
import { Accessibility, UserRole } from '@/enums'
import { FeatureAvailabilityInput, LocationInput, PlaceInput } from '@/inputs'
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
import { In } from 'typeorm'

@Resolver(() => Place)
export class PlaceResolver {
  @Query(() => [Place], { description: 'Admin and Manager only' })
  @Authorized([UserRole.admin, UserRole.manager])
  places(): Promise<Place[]> {
    return Place.find()
  }

  @Query(() => [Place])
  placesByLocation(@Arg('input') input: LocationInput): Promise<Place[]> {
    return Place.find()
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
    const [_, count] = await PlaceFeature.findAndCountBy({
      placeId: place.id,
    })
    return count
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
