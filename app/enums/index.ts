import { registerEnumType } from 'type-graphql'

export enum AuthProvider {
  google = 'google',
  facebook = 'facebook',
}

registerEnumType(AuthProvider, {
  name: 'AuthProvider',
})

export enum UserRole {
  user = 'user',
  manager = 'manager',
  admin = 'admin',
}

registerEnumType(UserRole, {
  name: 'UserRole',
})

export enum PlaceType {
  food = 'food',
  drinks = 'drinks',
  groceries = 'groceries',
  shopping = 'shopping',
  services = 'services',
  health = 'health',
  hotels = 'hotels',
  transport = 'transport',
}

registerEnumType(PlaceType, {
  name: 'PlaceType',
})
