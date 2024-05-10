import { PlaceAccessibility, PlaceType } from '@/enums'
import { Base, Feature, PlaceFeature, User } from '@/models'
import { Field, Float, ObjectType } from 'type-graphql'
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm'

@ObjectType()
@Entity()
export class Place extends Base {
  @Field(() => PlaceType)
  @Column({ nullable: false })
  type: PlaceType

  @Field(() => String)
  @Column({ nullable: false })
  name: string

  @Field(() => Float)
  @Column('double', { nullable: false })
  lat: number

  @Field(() => Float)
  @Column('double', { nullable: false })
  lng: number

  @Field(() => PlaceAccessibility, { nullable: false })
  @Column('int', { default: 0 })
  accessibility: PlaceAccessibility

  // Nullable

  @Field(() => String, { nullable: true })
  @Column('text', { nullable: true })
  description: string | null

  // Relations

  @ManyToOne(() => User, (user) => user.places, {
    nullable: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @Field(() => User)
  owner: Promise<User>

  // Features

  @OneToMany(() => PlaceFeature, (placeFeature) => placeFeature.place)
  placeFeature: Promise<PlaceFeature[]>

  @Field(() => [Feature])
  availableFeatures: Feature[]

  @Field(() => [Feature])
  unavailableFeatures: Feature[]
}
