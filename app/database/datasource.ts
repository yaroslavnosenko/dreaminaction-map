import { Feature, Place, User } from '@/models'
import { DataSource } from 'typeorm'

export const AppDataSource = new DataSource({
  type: 'better-sqlite3',
  database: ':memory:',
  entities: [Place, User, Feature],
  synchronize: true,
})
