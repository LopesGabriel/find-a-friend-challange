import { Org, Prisma } from '@prisma/client'
import { IOrgRepository } from '../org-repository'
import { prisma } from '@/db/prisma'

export class PrismaOrgRepository implements IOrgRepository {
  create(data: Prisma.OrgCreateInput): Promise<Org> {
    return prisma.org.create({
      data,
    })
  }

  findByEmail(email: string): Promise<Org | null> {
    return prisma.org.findUnique({
      where: { email },
    })
  }

  getById(id: string): Promise<Org | null> {
    return prisma.org.findUnique({
      where: { id },
    })
  }
}
