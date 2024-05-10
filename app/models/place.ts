import { PlaceType } from '@/enums'
import { Base, Feature, User } from '@/models'
import { Field, Float, Int, ObjectType } from 'type-graphql'
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm'
import { PlaceFeature } from './place_feature'

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

  @Field(() => Int)
  @Column('int', { nullable: false, default: 0 })
  availability: number

  // Nullable

  @Field(() => String, { nullable: true })
  @Column('text')
  description: string

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
  placeFeature: PlaceFeature[]

  @Field(() => [Feature])
  availableFeatures: Feature[]

  @Field(() => [Feature])
  unavailableFeatures: Feature[]
}
