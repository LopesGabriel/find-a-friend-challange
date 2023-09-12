import { InMemoryOrgRepository } from '@/repositories/in-memory/org-repository'
import { InMemoryPetRepository } from '@/repositories/in-memory/pet-repository'
import { ListPetUseCase } from '@/use-cases/list-pet'
import { createTestOrg } from '@/util/create-test-org'
import { createTestPet } from '@/util/create-test-pet'
import {
  EnergyLevel,
  IndependencyLevel,
  Org,
  PetAge,
  PetSize,
} from '@prisma/client'
import { it, describe, beforeEach, expect } from 'vitest'

describe('Create Pet Use Case', () => {
  let petRepository: InMemoryPetRepository
  let orgRepository: InMemoryOrgRepository
  let sto: ListPetUseCase

  beforeEach(() => {
    petRepository = new InMemoryPetRepository()
    orgRepository = new InMemoryOrgRepository()
    sto = new ListPetUseCase(petRepository, orgRepository)
  })

  it('should be possible to list pets filtered by city', async () => {
    const orgAddresses = [
      'Setor Habitacional Vicente Pires, Chácara 128, 15',
      'Setor Habitacional Arniqueiras, Conjunto 06 Chácara 25, 22',
      'QNM 16 Quadra E, Taguatinga, Distrito Federal',
    ]

    const orgs: Org[] = []
    for (const address of orgAddresses) {
      const org = await createTestOrg({ orgRepository, address })
      orgs.push(org)
    }

    for (const org of orgs) {
      for (let i = 0; i < 2; i++) {
        await createTestPet({ org, petRepository })
      }
    }

    const pets = await sto.execute({
      city: 'Vicente Pires',
    })

    expect(pets).toHaveLength(2)
  })

  it('should be possible to list pets filtered by size', async () => {
    const petSizes = [PetSize.SMALL, PetSize.MEDIUM, PetSize.MEDIUM]
    const org = await createTestOrg({ orgRepository })

    for (const size of petSizes) {
      await createTestPet({ org, petRepository, size })
    }

    const pets = await sto.execute({
      city: 'SHVP',
      size: PetSize.MEDIUM,
    })

    expect(pets).toHaveLength(2)
  })

  it('should be possible to list pets filtered by energy level', async () => {
    const petEnergyLevels = [
      EnergyLevel.HIGH,
      EnergyLevel.HIGH,
      EnergyLevel.MEDIUM,
      EnergyLevel.HIGH,
      EnergyLevel.LOW,
    ]
    const org = await createTestOrg({ orgRepository })

    for (const energy of petEnergyLevels) {
      await createTestPet({ org, petRepository, energy })
    }

    const pets = await sto.execute({
      city: 'SHVP',
      energyLevel: EnergyLevel.HIGH,
    })

    expect(pets).toHaveLength(3)
  })

  it('should be possible to list pets filtered by independency level', async () => {
    const petIndependencyLevel = [
      IndependencyLevel.HIGH,
      IndependencyLevel.HIGH,
      IndependencyLevel.HIGH,
      IndependencyLevel.HIGH,
      IndependencyLevel.LOW,
      IndependencyLevel.LOW,
      IndependencyLevel.MEDIUM,
    ]
    const org = await createTestOrg({ orgRepository })

    for (const independencyLevel of petIndependencyLevel) {
      await createTestPet({ org, petRepository, independencyLevel })
    }

    const pets = await sto.execute({
      city: 'SHVP',
      independencyLevel: IndependencyLevel.LOW,
    })

    expect(pets).toHaveLength(2)
  })

  it('should be possible to list pets filtered by pet age', async () => {
    const petAge = [
      PetAge.FULL_GROWN,
      PetAge.FULL_GROWN,
      PetAge.JUNIOR,
      PetAge.NEWBORN,
      PetAge.NEWBORN,
      PetAge.POST_TEEN,
    ]
    const org = await createTestOrg({ orgRepository })

    for (const age of petAge) {
      await createTestPet({ org, petRepository, age })
    }

    const pets = await sto.execute({
      city: 'SHVP',
      age: PetAge.NEWBORN,
    })

    expect(pets).toHaveLength(2)
  })
})
