import request from 'supertest'
import { useServer } from './utils/server'

describe('e2e demo', () => {
  const server = useServer()

  it('test', async () => {
    const { url } = server()
    const response = await request(url)
      .post('/')
      .send({ query: 'query { user { id } }' })
    expect(response.status).toBe(200)
    expect(response.body.data?.user?.id).toBe('1')
  })

  it('test', async () => {
    const { url } = server()
    return request(url)
      .post('/')
      .send({ query: 'query { user { id } }' })
      .expect((res) => {
        const data = res.body.data?.user
        expect(res.status).toBe(200)
        expect(data?.id).toBe('1')
      })
  })
})
