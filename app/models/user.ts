import { UserRole } from '@/enums'
import { Base, Place } from '@/models'
import { Field, ObjectType } from 'type-graphql'
import { Column, Entity, OneToMany } from 'typeorm'

@ObjectType()
@Entity()
export class User extends Base {
  @Field(() => String)
  @Column({ unique: true, nullable: false })
  email: string

  @Field(() => UserRole)
  @Column({ nullable: false })
  role: UserRole

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  firstName: string | null

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  lastName: string | null

  @Field(() => [Place])
  @OneToMany(() => Place, (place) => place.owner)
  places: Promise<Place[]>
}
