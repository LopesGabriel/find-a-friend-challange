import { expect, it, describe, beforeAll, afterAll } from 'vitest'
import request from 'supertest'
import { app } from '@/app'

describe('Get Pet (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to Get pet by id', async () => {
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

    const createPetResponse = await request(app.server)
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

    const petId = createPetResponse.body.data.id

    const response = await request(app.server)
      .get(`/pet/${petId}`)
      .auth(authResponse.body.token, { type: 'bearer' })
      .send()

    expect(response.body.data).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        name: 'John',
        independencyLevel: 'MEDIUM',
        energy: 'HIGH',
      }),
    )
  })
})
