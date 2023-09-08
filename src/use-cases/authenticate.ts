import { IOrgRepository } from '@/repositories/org-repository'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'
import { compare } from 'bcryptjs'
import { Org } from '@prisma/client'

interface IAuthenticateExecuteArgs {
  email: string
  password: string
}

interface IAuthenticateExecuteResult {
  org: Org
}

export class AuthenticateUseCase {
  constructor(private orgRepository: IOrgRepository) {}

  async execute({
    email,
    password,
  }: IAuthenticateExecuteArgs): Promise<IAuthenticateExecuteResult> {
    const org = await this.orgRepository.findByEmail(email)

    if (!org) {
      throw new InvalidCredentialsError()
    }

    const doesPasswordMatches = await compare(password, org.password_hashed)

    if (!doesPasswordMatches) {
      throw new InvalidCredentialsError()
    }

    return {
      org,
    }
  }
}
