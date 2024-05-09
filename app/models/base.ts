import { Field, ID, ObjectType } from 'type-graphql'
import { BaseEntity, PrimaryGeneratedColumn } from 'typeorm'

@ObjectType()
export class Base extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string
}
