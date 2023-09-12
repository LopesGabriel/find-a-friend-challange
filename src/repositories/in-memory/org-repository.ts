import { Org, Prisma } from '@prisma/client'
import { randomUUID } from 'crypto'

import { IOrgRepository } from '../org-repository'

export class InMemoryOrgRepository implements IOrgRepository {
  private orgs: Org[] = []

  async create(data: Prisma.OrgCreateInput): Promise<Org> {
    if (!data.id) data.id = randomUUID()

    const { address, cep, email, password_hashed, responsible, whatsapp, id } =
      data

    const newOrg: Org = {
      address,
      cep,
      email,
      id,
      password_hashed,
      responsible,
      whatsapp,
    }

    this.orgs.push(newOrg)
    return newOrg
  }

  async findByEmail(email: string): Promise<Org | null> {
    return this.orgs.find((org) => org.email === email) ?? null
  }

  async getById(id: string): Promise<Org | null> {
    return this.orgs.find((org) => org.id === id) ?? null
  }
}
