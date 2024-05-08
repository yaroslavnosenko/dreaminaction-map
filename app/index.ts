import { createApolloServer } from '@/server'

const bootstrap = async () => {
  const { url } = await createApolloServer({ port: 4000 })
  console.log(`GraphQL server ready at ${url}`)
}

bootstrap()
