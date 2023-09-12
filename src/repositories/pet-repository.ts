import { Pet, Prisma } from '@prisma/client'

export interface IPetRepository {
  create(data: Prisma.PetCreateInput): Promise<Pet>
}
