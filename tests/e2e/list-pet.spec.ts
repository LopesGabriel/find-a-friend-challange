import { expect, it, describe, beforeAll, afterAll } from 'vitest'
import request from 'supertest'
import { app } from '@/app'

describe('List Pets (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to list pets by city', async () => {
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

    const authResponse = await request(app.server).post('/auth').send({
      email,
      password,
    })

    await request(app.server)
      .post('/pet')
      .auth(authResponse.body.token, { type: 'bearer' })
      .send({
        age: 'NEWBORN',
        energy: 'HIGH',
        environment: 'LARGE',
        independencyLevel: 'MEDIUM',
        name: 'John',
        requisits: ['Have Large space', 'Send pictures of it each 3 months'],
        size: 'LARGE',
        about: 'John is a Dalmatian with a lot of energy to play',
      })
      .expect(201)

    await request(app.server)
      .post('/pet')
      .auth(authResponse.body.token, { type: 'bearer' })
      .send({
        age: 'PRE_TEEN',
        energy: 'HIGH',
        environment: 'LARGE',
        independencyLevel: 'HIGH',
        name: 'Maia',
        requisits: ['Be patient', 'Send pictures of it each 2 months'],
        size: 'SMALL',
        about: 'Maia is a Pintcher with a lot of energy to play',
      })
      .expect(201)

    const response = await request(app.server)
      .get('/pet/SHVP')
      .auth(authResponse.body.token, { type: 'bearer' })
      .send()

    expect(response.body.data).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(String),
          name: 'John',
          independencyLevel: 'MEDIUM',
          energy: 'HIGH',
        }),
        expect.objectContaining({
          id: expect.any(String),
          name: 'Maia',
          independencyLevel: 'HIGH',
          energy: 'HIGH',
        }),
      ]),
    )
  })
})
