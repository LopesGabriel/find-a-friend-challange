import { expect, it, describe, beforeAll, afterAll } from 'vitest'
import request from 'supertest'
import { app } from '@/app'

describe('Create Org (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create org', async () => {
    const email = 'john.doe@example.com'
    const password = '123456'

    const response = await request(app.server)
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

    expect(response.body).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        email,
        cep: '72001795',
        responsible: 'John Doe',
      }),
    )
  })
})
