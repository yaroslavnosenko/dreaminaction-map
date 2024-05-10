import { UserRole } from '@/enums'
import { AppContext } from '@/types'
import { AuthorizationError, MiddlewareFn } from 'type-graphql'

export const MeAnd = (roles: UserRole[]): MiddlewareFn<AppContext> => {
  return async ({ args, context: { user } }, next) => {
    if (roles.includes(user.role)) return next()
    const userId = args['id']
    if (userId !== user.id) {
      throw new AuthorizationError()
    }
    return next()
  }
}
