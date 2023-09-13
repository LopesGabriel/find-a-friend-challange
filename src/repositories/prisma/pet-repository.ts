import { Pet, Prisma } from '@prisma/client'
import { prisma } from '@/db/prisma'
import { IFindPetsArgs, IPetRepository } from '../pet-repository'

export class PrismaPetRepository implements IPetRepository {
  create(data: Prisma.PetCreateInput): Promise<Pet> {
    return prisma.pet.create({
      data,
    })
  }

  findById(id: string): Promise<Pet | null> {
    return prisma.pet.findUnique({
      where: {
        id,
      },
    })
  }

  findPets({
    orgIds,
    age,
    energyLevel,
    independencyLevel,
    size,
  }: IFindPetsArgs): Promise<Pet[]> {
    return prisma.pet.findMany({
      where: {
        age,
        energy: energyLevel,
        independencyLevel,
        size,
        org: {
          id: {
            in: orgIds,
          },
        },
      },
    })
  }
}
