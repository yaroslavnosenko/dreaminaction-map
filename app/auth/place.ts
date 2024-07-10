import { UserRole } from '@/enums'
import { Place } from '@/models'
import { AppContext } from '@/types'
import { AuthorizationError, MiddlewareFn } from 'type-graphql'

export const OwnerAnd = (roles: UserRole[]): MiddlewareFn<AppContext> => {
  return async ({ args, context: { user } }, next) => {
    if (roles.includes(user.role)) return next()

    const userId = args['userId']
    if (userId && userId !== user.id) {
      throw new AuthorizationError()
    }

    const placeId = args['id']
    if (placeId) {
      const place = await Place.findOneBy({ owner: user, id: placeId })
      if (!place) {
        throw new AuthorizationError()
      }
    }
    return next()
  }
}
