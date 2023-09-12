import { InMemoryOrgRepository } from '@/repositories/in-memory/org-repository'
import { InMemoryPetRepository } from '@/repositories/in-memory/pet-repository'
import { CreatePetUseCase } from '@/use-cases/create-pet'
import { createTestOrg } from '@/util/create-test-org'
import { randomUUID } from 'crypto'
import { it, describe, beforeEach, expect } from 'vitest'

describe('Create Pet Use Case', () => {
  let petRepository: InMemoryPetRepository
  let orgRepository: InMemoryOrgRepository
  let sto: CreatePetUseCase

  beforeEach(() => {
    petRepository = new InMemoryPetRepository()
    orgRepository = new InMemoryOrgRepository()
    sto = new CreatePetUseCase(petRepository, orgRepository)
  })

  it('should be possible to create a pet', async () => {
    const org = await createTestOrg({ orgRepository })

    const newPet = await sto.execute({
      age: 'JUNIOR',
      energy: 'MEDIUM',
      environment: 'SMALL',
      independencyLevel: 'MEDIUM',
      name: 'Maia Pinscher',
      orgId: org.id,
      requisits: ['Be patient'],
      size: 'SMALL',
      about: 'Maia is a pinscher that loves to play it does a lot of noise',
    })

    expect(newPet).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        name: 'Maia Pinscher',
        size: 'SMALL',
        age: 'JUNIOR',
      }),
    )
  })

  it('should not be possible to create a pet with invalid org', async () => {
    await expect(
      sto.execute({
        age: 'JUNIOR',
        energy: 'MEDIUM',
        environment: 'SMALL',
        independencyLevel: 'MEDIUM',
        name: 'Maia Pinscher',
        orgId: randomUUID(),
        requisits: ['Be patient'],
        size: 'SMALL',
        about: 'Maia is a pinscher that loves to play it does a lot of noise',
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
