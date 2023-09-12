import { Prisma, Pet } from '@prisma/client'
import { IPetRepository } from '../pet-repository'
import { randomUUID } from 'crypto'

export class InMemoryPetRepository implements IPetRepository {
  private pets: Pet[] = []

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
}
