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

export enum Category {
  food = 'food',
  drinks = 'drinks',
  groceries = 'groceries',
  shopping = 'shopping',
  health = 'health',
  hotels = 'hotels',
  transport = 'transport',
  sites = 'sites',
}

registerEnumType(Category, {
  name: 'Category',
})

export enum Accessibility {
  unknown = 0,
  non_compliant = 1,
  partially_compliant = 2,
  compliant = 3,
}

registerEnumType(Accessibility, {
  name: 'Accessibility',
})
