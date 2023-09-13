import { PrismaOrgRepository } from '@/repositories/prisma/org-repository'
import { CreatePetUseCase } from '../create-pet'
import { PrismaPetRepository } from '@/repositories/prisma/pet-repository'

export function makeCreatePetUseCase() {
  const petRepository = new PrismaPetRepository()
  const orgRepository = new PrismaOrgRepository()
  const useCase = new CreatePetUseCase(petRepository, orgRepository)

  return useCase
}
