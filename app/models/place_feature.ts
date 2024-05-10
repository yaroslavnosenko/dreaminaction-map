import { Base, Feature, Place } from '@/models'
import { Column, Entity, ManyToOne } from 'typeorm'

@Entity()
export class PlaceFeature extends Base {
  @ManyToOne(() => Place, {
    nullable: false,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  place: Place

  @ManyToOne(() => Feature, {
    nullable: false,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  feature: Feature

  @Column({ nullable: false })
  available: boolean
}
