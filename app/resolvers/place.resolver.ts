import { OwnerAnd } from '@/auth'
import { Accessibility, UserRole } from '@/enums'
import { FeatureAvailabilityInput, LocationInput, PlaceInput } from '@/inputs'
import { Feature, Place, PlaceFeature, User } from '@/models'
import {
  Arg,
  Authorized,
  FieldResolver,
  ID,
  Mutation,
  Query,
  Resolver,
  Root,
  UseMiddleware,
} from 'type-graphql'
import { In } from 'typeorm'

@Resolver(() => Place)
export class PlaceResolver {
  @Query(() => [Place])
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

  @FieldResolver(() => [Feature])
  async availableFeatures(@Root() place: Place): Promise<Feature[]> {
    const placeFeatures = await PlaceFeature.findBy({ placeId: place.id })
    const filteredIds = placeFeatures
      .filter((feature) => feature.available === true)
      .map((feature) => feature.id)
    return Feature.findBy({ id: In(filteredIds) })
  }

  @FieldResolver(() => [Feature])
  async unavailableFeatures(@Root() place: Place): Promise<Feature[]> {
    const placeFeatures = await PlaceFeature.findBy({ placeId: place.id })
    const filteredIds = placeFeatures
      .filter((feature) => feature.available === false)
      .map((feature) => feature.id)
    return Feature.findBy({ id: In(filteredIds) })
  }

  @Mutation(() => ID)
  @Authorized()
  @UseMiddleware(OwnerAnd([UserRole.admin]))
  async createPlace(
    @Arg('userId', () => ID) userId: string,
    @Arg('input') input: PlaceInput
  ): Promise<string> {
    const owner = await User.findOneByOrFail({ id: userId })
    const place = Place.create({ ...input })
    place.owner = Promise.resolve(owner)
    const { id } = await place.save()
    return id
  }

  @Mutation(() => ID)
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

  @Mutation(() => Boolean)
  @Authorized()
  @UseMiddleware(OwnerAnd([UserRole.admin]))
  async deletePlace(@Arg('id', () => ID) id: string): Promise<boolean> {
    const place = await Place.findOneByOrFail({ id })
    await place.remove()
    return true
  }

  @Mutation(() => Accessibility)
  @Authorized([UserRole.admin, UserRole.manager])
  async updatePlaceAccessibility(
    @Arg('id', () => ID) id: string,
    @Arg('accessibility', () => Accessibility)
    accessibility: Accessibility
  ): Promise<number> {
    const place = await Place.findOneByOrFail({ id })
    await Place.create({ ...place, accessibility }).save()
    return accessibility
  }

  @Mutation(() => Boolean)
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
