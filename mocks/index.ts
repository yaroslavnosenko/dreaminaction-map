import { Accessibility, Category, UserRole } from '@/enums'

export const users = [
  {
    id: 'b6b66c22-8830-4b4a-a570-5b35a29a99f5',
    email: 'admin@mail.mock',
    firstName: 'Peter',
    lastName: 'Admin',
    role: UserRole.admin,
  },
  {
    id: '107acdb1-4c2c-4fb5-98de-d760766c961d',
    email: 'manager@mail.mock',
    firstName: 'John',
    lastName: 'Manager',
    role: UserRole.manager,
  },
  {
    id: '2817aa17-4dcf-4eb1-8bca-4fc7135b0db0',
    email: 'user@mail.mock',
    firstName: 'Adam',
    lastName: 'User',
    role: UserRole.user,
  },
]

export const places = [
  {
    id: 'd6dcdd59-edd5-44f1-9fff-e5bc34e01f99',
    name: 'Uzhhorod Castle',
    address: 'Kapitulna St, 33, Uzhhorod, Zakarpattia Oblast, Ukraine, 88000',
    category: Category.sites,
    accessibility: Accessibility.partially_compliant,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vitae diam sit amet tortor interdum mollis. Donec elementum, velit vel tristique suscipit, metus ante euismod ante, eget eleifend lacus tortor vel nibh.',
    lat: 48.62,
    lng: 22.28,
    ownerId: users[2].id,
  },
  {
    id: '686ffb09-e15f-4673-af26-e29f91eba34c',
    name: 'Dastor',
    address: 'Sobranetska St, 89, Uzhhorod, Zakarpattia Oblast, Ukraine, 88000',
    category: Category.groceries,
    accessibility: Accessibility.compliant,
    lat: 48.645,
    lng: 22.295,
    ownerId: users[2].id,
  },
  {
    id: 'cf6b9ca6-a5a7-436f-b714-8ea6e6822cd9',
    name: 'Duet Plus',
    address: 'Koshytska St, 6, Uzhhorod, Zakarpattia Oblast, Ukraine, 88000',
    category: Category.food,
    accessibility: Accessibility.partially_compliant,
    lat: 48.61,
    lng: 22.27,
    ownerId: users[2].id,
  },
  {
    id: '9d063120-eb4c-4b95-9385-81f76f8c3de0',
    name: 'Sovyne Hnizdo',
    address:
      'Ferentsa Rakotsi St, Uzhhorod, Zakarpattia Oblast, Ukraine, 88000',
    category: Category.sites,
    accessibility: Accessibility.non_compliant,
    lat: 48.61,
    lng: 22.3,
    ownerId: users[2].id,
  },
  {
    id: '035f4c6e-a878-474f-8606-5a8dc32c1382',
    name: 'White Hills Hotel spa & sport',
    address: 'Main ST 7, Uzhhorod, Zakarpattia Oblast, Ukraine, 88000',
    category: Category.hotels,
    accessibility: Accessibility.unknown,
    lat: 48.627,
    lng: 22.29,
    ownerId: users[1].id,
  },
]

export const features = [
  {
    id: '32dee6a5-adcf-4a02-8c75-9dd4623bf470',
    name: 'Wheelchair ramps',
  },
  {
    id: 'd1561ed5-7ec7-459e-9f55-c9c6a5c8fd00',
    name: 'Elevators with Braille and auditory signals',
  },
  {
    id: '8249876a-5a6e-4cfc-be5f-778cc724ee80',
    name: 'Designated accessible parking spaces',
  },
]
