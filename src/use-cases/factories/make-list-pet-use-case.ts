import { PrismaOrgRepository } from '@/repositories/prisma/org-repository'
import { ListPetUseCase } from '../list-pet'
import { PrismaPetRepository } from '@/repositories/prisma/pet-repository'

export function makeListPetUseCase() {
  const petRepository = new PrismaPetRepository()
  const orgRepository = new PrismaOrgRepository()
  const useCase = new ListPetUseCase(petRepository, orgRepository)

  return useCase
}
