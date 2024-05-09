import 'reflect-metadata'

import { AppDataSource } from '@/database'
import { FeatureResolver, PlaceResolver, UserResolver } from '@/resolvers'
import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import { GraphQLError, GraphQLFormattedError } from 'graphql'
import { buildSchema } from 'type-graphql'
import { EntityNotFoundError } from 'typeorm'

const formatError = (
  formattedError: GraphQLFormattedError,
  { originalError: error }: GraphQLError
) => {
  if (error instanceof EntityNotFoundError) {
    return { message: 'NOT_FOUND' }
  }
  return formattedError
}

export const createApolloServer = async ({ port }) => {
  await AppDataSource.initialize()
  const schema = await buildSchema({
    resolvers: [UserResolver, PlaceResolver, FeatureResolver],
  })
  const server = new ApolloServer({ schema, formatError })
  const { url } = await startStandaloneServer(server, { listen: { port } })
  return { server, url }
}
