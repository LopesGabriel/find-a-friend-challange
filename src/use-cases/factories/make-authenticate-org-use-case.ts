import { PrismaOrgRepository } from '@/repositories/prisma/org-repository'
import { AuthenticateUseCase } from '../authenticate'

export function makeAuthenticateOrgUseCase() {
  const orgRepository = new PrismaOrgRepository()
  const useCase = new AuthenticateUseCase(orgRepository)

  return useCase
}
