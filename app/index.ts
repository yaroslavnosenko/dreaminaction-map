import { config } from '@/config'
import { createApolloServer } from '@/server'

const bootstrap = async () => {
  const { url } = await createApolloServer({ port: config.app.port })
  console.log(`GraphQL server ready at ${url}`)
}

bootstrap()
