import { User } from '@/models'

export type AppContext = {
  user: User | null
}

export type JwtPayload = {
  uid: string
}

export type ProviderUser = {
  email: string
  firstName?: string
  lastName?: string
}
