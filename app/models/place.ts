import { Accessibility, Category } from '@/enums'
import { Base, Feature, PlaceFeature, User } from '@/models'
import { Field, Float, Int, ObjectType } from 'type-graphql'
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm'

@ObjectType()
@Entity()
export class Place extends Base {
  @Field(() => Category)
  @Column({ nullable: false })
  category: Category

  @Field(() => String)
  @Column({ nullable: false })
  name: string

  @Field(() => String)
  @Column({ nullable: false })
  address: string

  @Field(() => Float)
  @Column('double', { nullable: false })
  lat: number

  @Field(() => Float)
  @Column('double', { nullable: false })
  lng: number

  @Field(() => Accessibility, { nullable: false })
  @Column('int', { default: 0 })
  accessibility: Accessibility

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
  @Field(() => User, { description: 'Admin and Manager only' })
  owner: Promise<User>
  @Column({ nullable: false })
  ownerId: string

  // Features

  @OneToMany(() => PlaceFeature, (placeFeature) => placeFeature.place)
  placeFeature: Promise<PlaceFeature[]>

  @Field(() => [Feature])
  availableFeatures: Feature[]

  @Field(() => [Feature])
  unavailableFeatures: Feature[]

  @Field(() => Int)
  featuresCount: number
}
