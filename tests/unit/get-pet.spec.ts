import { InMemoryOrgRepository } from '@/repositories/in-memory/org-repository'
import { InMemoryPetRepository } from '@/repositories/in-memory/pet-repository'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { GetPetUseCase } from '@/use-cases/get-pet'
import { createTestOrg } from '@/util/create-test-org'
import { createTestPet } from '@/util/create-test-pet'
import { randomUUID } from 'crypto'
import { it, describe, beforeEach, expect } from 'vitest'

describe('Get Pet Use Case', () => {
  let petRepository: InMemoryPetRepository
  let orgRepository: InMemoryOrgRepository
  let sto: GetPetUseCase

  beforeEach(() => {
    petRepository = new InMemoryPetRepository()
    orgRepository = new InMemoryOrgRepository()
    sto = new GetPetUseCase(petRepository)
  })

  it('should be possible to retrieve pet details', async () => {
    const org = await createTestOrg({ orgRepository })
    const { id } = await createTestPet({ petRepository, org })

    const pet = await sto.execute({ petId: id })

    expect(pet).toEqual(
      expect.objectContaining({
        id,
        name: 'Maia Pinscher',
        size: 'SMALL',
        age: 'JUNIOR',
      }),
    )
  })

  it('should not be possible to retrieve unnexisting pet details', async () => {
    const id = randomUUID()

    await expect(() => sto.execute({ petId: id })).rejects.toBeInstanceOf(
      ResourceNotFoundError,
    )
  })
})
