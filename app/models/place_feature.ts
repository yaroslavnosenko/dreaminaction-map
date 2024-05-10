import { Base, Feature, Place } from '@/models'
import { Column, Entity, ManyToOne } from 'typeorm'

@Entity()
export class PlaceFeature extends Base {
  @ManyToOne(() => Place, {
    nullable: false,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  place: Promise<Place>
  @Column({ nullable: false })
  placeId: string

  @ManyToOne(() => Feature, {
    nullable: false,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  feature: Promise<Feature>
  @Column({ nullable: false })
  featureId: string

  @Column({ nullable: false })
  available: boolean
}
