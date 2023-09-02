import { IOrgRepository } from '@/repositories/org-repository'
import { hash } from 'bcryptjs'

interface IExecuteArgs {
  address: string
  cep: string
  email: string
  password: string
  responsible: string
  whatsapp: string
}

export class CreateOrgUseCase {
  constructor(private readonly orgRepository: IOrgRepository) {}

  async execute(data: IExecuteArgs) {
    const { address, cep, email, password, responsible, whatsapp } = data

    if (!address) {
      throw new Error('Address is required')
    }

    if (!whatsapp) {
      throw new Error('Whatsapp is required')
    }

    const existingOrg = await this.orgRepository.findByEmail(email)

    if (existingOrg) {
      throw new Error('Org with this email already exists')
    }

    const password_hashed = await hash(password, 6)

    const org = await this.orgRepository.create({
      address,
      cep,
      email,
      password_hashed,
      responsible,
      whatsapp,
    })

    return org
  }
}
