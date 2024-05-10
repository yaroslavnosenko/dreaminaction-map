import { config } from '@/config'
import { User } from '@/models'
import { JwtPayload } from '@/types'
import { sign, verify } from 'jsonwebtoken'

export const signToken = (payload: JwtPayload): string => {
  return sign(payload, config.jwt.secret, { expiresIn: config.jwt.exp })
}

export const getUserByJwt = async (jwt: string): Promise<User | null> => {
  try {
    const { uid: id } = verify(jwt, config.jwt.secret, {
      ignoreExpiration: false,
    }) as JwtPayload
    return User.findOneBy({ id })
  } catch {
    return null
  }
}
