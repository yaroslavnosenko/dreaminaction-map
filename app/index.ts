import { createApolloServer } from '@/server'

const bootstrap = async () => {
  const { url } = await createApolloServer({ port: 3000 })
  console.log(`GraphQL server ready at ${url}`)
}

bootstrap()
