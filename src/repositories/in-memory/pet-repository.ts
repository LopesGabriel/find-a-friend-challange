import { Prisma, Pet } from '@prisma/client'
import { IFindPetsArgs, IPetRepository } from '../pet-repository'
import { randomUUID } from 'crypto'

export class InMemoryPetRepository implements IPetRepository {
  private pets: Pet[] = []

  async findById(id: string): Promise<Pet | null> {
    return this.pets.find((pet) => pet.id === id) ?? null
  }

  async create(data: Prisma.PetCreateInput): Promise<Pet> {
    const newPet: Pet = {
      about: data.about ?? null,
      age: data.age,
      energy: data.energy,
      environment: data.environment,
      id: randomUUID(),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      images: data.images ?? ([] as any),
      independencyLevel: data.independencyLevel,
      name: data.name,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      requisits: data.requisits ?? ([] as any),
      size: data.size,
      org_id: data.org.connect?.id ?? '',
    }

    this.pets.push(newPet)
    return newPet
  }

  async findPets({
    orgIds,
    energyLevel,
    size,
    age,
    independencyLevel,
  }: IFindPetsArgs): Promise<Pet[]> {
    let pets = this.pets.filter((pet) => orgIds.includes(pet.org_id))

    if (size) {
      pets = pets.filter((pet) => pet.size === size)
    }

    if (energyLevel) {
      pets = pets.filter((pet) => pet.energy === energyLevel)
    }

    if (age) {
      pets = pets.filter((pet) => pet.age === age)
    }

    if (independencyLevel) {
      pets = pets.filter((pet) => pet.independencyLevel === independencyLevel)
    }

    return pets
  }
}
