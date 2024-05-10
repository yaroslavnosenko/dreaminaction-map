import { Feature, Place, User } from '@/models'
import { PlaceFeature } from '@/models/place_feature'
import { DataSource } from 'typeorm'

export const AppDataSource = new DataSource({
  type: 'better-sqlite3',
  database: './local.sqlite',
  entities: [User, Place, Feature, PlaceFeature],
  synchronize: true,
})
