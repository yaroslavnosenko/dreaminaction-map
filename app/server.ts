import 'reflect-metadata'

import { appAuthChecker, getUserByJwt } from '@/auth'
import { AppDataSource } from '@/database'
import {
  AuthResolver,
  FeatureResolver,
  PlaceResolver,
  UserResolver,
} from '@/resolvers'
import { AppContext } from '@/types'
import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import { GraphQLError, GraphQLFormattedError } from 'graphql'
import { AuthorizationError, buildSchema } from 'type-graphql'
import { EntityNotFoundError } from 'typeorm'

const formatError = (
  formattedError: GraphQLFormattedError,
  { originalError: error }: GraphQLError
) => {
  if (error instanceof EntityNotFoundError) {
    return { message: 'NOT_FOUND' }
  }
  if (error instanceof AuthorizationError) {
    return { message: 'UNAUTHORIZED' }
  }
  return formattedError
}

const context = async ({ req }): Promise<AppContext> => {
  const token: string = req.headers.authorization?.split(' ')[1] || ''
  const user = await getUserByJwt(token)
  return { user }
}

export const createApolloServer = async ({ port }) => {
  await AppDataSource.initialize()
  const schema = await buildSchema({
    resolvers: [AuthResolver, UserResolver, PlaceResolver, FeatureResolver],
    authChecker: appAuthChecker,
  })
  const server = new ApolloServer<AppContext>({ schema, formatError })
  const { url } = await startStandaloneServer(server, {
    context,
    listen: { port },
  })
  return { server, url }
}
