import { UserRole } from '@/enums'
import { AppContext } from '@/types'
import { AuthChecker } from 'type-graphql'

export const appAuthChecker: AuthChecker<AppContext> = (
  { context: { user } },
  roles: UserRole[]
) => {
  if (!user) return false
  if (roles.length === 0) return true
  return roles.includes(user.role)
}
