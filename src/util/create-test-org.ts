import { IOrgRepository } from '@/repositories/org-repository'
import { hash } from 'bcryptjs'

export interface ICreateTestOrgProps {
  orgRepository: IOrgRepository

  address?: string
  cep?: string
  email?: string
  password?: string
  responsible?: string
  whatsapp?: string
}

export async function createTestOrg({
  orgRepository,
  ...data
}: ICreateTestOrgProps) {
  const pw = data.password ?? 'XXXXXX'
  const hashedPw = await hash(pw, 6)

  const org = await orgRepository.create({
    address: data.address ?? 'SHVP Trecho 3 Ch. 128, 15',
    cep: data.cep ?? '72001795',
    email: data.email ?? 'john.doe@example.com',
    password_hashed: hashedPw,
    responsible: 'John Doe',
    whatsapp: '+5511999999999',
  })

  return org
}
