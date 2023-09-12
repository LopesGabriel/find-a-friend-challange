import { Org, Prisma } from '@prisma/client'

export interface IOrgRepository {
  create(data: Prisma.OrgCreateInput): Promise<Org>
  findByEmail(email: string): Promise<Org | null>
  getById(id: string): Promise<Org | null>
  findByAddressContaining(value: string): Promise<Org[]>
}
