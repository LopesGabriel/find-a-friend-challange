import { expect, it, describe, beforeAll, afterAll } from 'vitest'
import request from 'supertest'
import { app } from '@/app'

describe('Authenticate (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to authenticate the org', async () => {
    const email = 'john.doe@example.com'
    const password = '123456'

    await request(app.server)
      .post('/org')
      .send({
        responsible: 'John Doe',
        email,
        cep: '72001795',
        address: 'SHVP Trecho 3 Chácara 128, 15',
        whatsapp: '+5561999999999',
        password,
      })
      .expect(201)

    const response = await request(app.server).post('/auth').send({
      email,
      password,
    })

    expect(response.status).toBe(200)
    expect(response.body.token).toEqual(expect.any(String))
  })
})
