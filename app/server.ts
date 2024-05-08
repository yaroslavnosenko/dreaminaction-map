import 'reflect-metadata'

import { UserResolver } from '@/resolvers'
import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import { buildSchema } from 'type-graphql'

export const createApolloServer = async ({ port }) => {
  const schema = await buildSchema({
    resolvers: [UserResolver],
  })
  const server = new ApolloServer({ schema })
  const { url } = await startStandaloneServer(server, { listen: { port } })
  return { server, url }
}
