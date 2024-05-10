import { AuthInput } from '@/inputs'
import { ProviderUser } from '@/types'

export const getProviderUser = async ({
  token,
}: AuthInput): Promise<ProviderUser> => {
  return {
    email: token + '@mail.mock',
  }
}
