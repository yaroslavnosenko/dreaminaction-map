import { Base } from '@/models/base'
import { Field, ObjectType } from 'type-graphql'
import { Column, Entity } from 'typeorm'

@ObjectType()
@Entity()
export class Feature extends Base {
  @Field(() => String)
  @Column({ nullable: false })
  name: string
}
