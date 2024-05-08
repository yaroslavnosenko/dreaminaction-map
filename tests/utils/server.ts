import { createApolloServer } from '@/server'
import { ApolloServer } from '@apollo/server'

export const useServer = () => {
  let server: ApolloServer, url: string

  beforeEach(async () => {
    const res = await createApolloServer({ port: 0 })
    server = res.server
    url = res.url
  })

  afterEach(async () => {
    await server?.stop()
  })

  return () => ({ url })
}
