import { beforeEach, describe, expect, it } from 'vitest'
import { AuthenticateUseCase } from '../../src/use-cases/authenticate'
import { IOrgRepository } from '@/repositories/org-repository'
import { InMemoryOrgRepository } from '@/repositories/in-memory/org-repository'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error'

describe('Authentication Use Case', () => {
  let repository: IOrgRepository
  let sto: AuthenticateUseCase

  beforeEach(() => {
    repository = new InMemoryOrgRepository()
    sto = new AuthenticateUseCase(repository)
  })

  it('should be able to authenticate with correct email and password', async () => {
    const password = '147852369'
    const email = 'john.doe@gmail.com'
    const password_hashed = await hash(password, 6)

    await repository.create({
      address: 'SHVP Trecho 3, Chácara 128, 15',
      cep: '72001795',
      email,
      password_hashed,
      responsible: 'John Doe',
      whatsapp: '+5561999999999',
    })

    const { org } = await sto.execute({ email, password })
    expect(org).toEqual(
      expect.objectContaining({
        address: 'SHVP Trecho 3, Chácara 128, 15',
        cep: '72001795',
        email,
      }),
    )
  })

  it('should not be able to authenticate with wrong password', async () => {
    const password = '147852369'
    const email = 'john.doe@gmail.com'
    const password_hashed = await hash(password, 6)

    await repository.create({
      address: 'SHVP Trecho 3, Chácara 128, 15',
      cep: '72001795',
      email,
      password_hashed,
      responsible: 'John Doe',
      whatsapp: '+5561999999999',
    })

    await expect(() =>
      sto.execute({ email, password: '963852741' }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
