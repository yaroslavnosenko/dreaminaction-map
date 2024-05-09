import { PlaceType } from '@/enums'
import { Base, User } from '@/models'
import { Field, Float, Int, ObjectType } from 'type-graphql'
import { Column, Entity, ManyToOne } from 'typeorm'

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

  @ManyToOne(() => User, (user) => user.places, {
    nullable: false,
    cascade: true,
  })
  @Field(() => User)
  owner: Promise<User>

  @Field(() => String, { nullable: true })
  @Column('text')
  description: string
}
