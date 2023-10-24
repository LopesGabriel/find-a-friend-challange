import { PrismaPetRepository } from '@/repositories/prisma/pet-repository'
import { GetPetUseCase } from '../get-pet'

export function makeGetPetUseCase() {
  const petRepository = new PrismaPetRepository()
  const useCase = new GetPetUseCase(petRepository)

  return useCase
}
