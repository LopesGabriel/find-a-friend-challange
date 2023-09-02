import { InMemoryOrgRepository } from '@/repositories/in-memory/org-repository'
import { CreateOrgUseCase } from '@/use-cases/create-org'
import { it, describe, beforeEach, expect } from 'vitest'

describe('Create Org Use Case', () => {
  let orgRepository: InMemoryOrgRepository
  let sto: CreateOrgUseCase

  beforeEach(() => {
    orgRepository = new InMemoryOrgRepository()
    sto = new CreateOrgUseCase(orgRepository)
  })

  it('should be possible to create an organization', async () => {
    const org = await sto.execute({
      address: 'SHVP Trecho 3 Ch. 128, 15',
      cep: '72001795',
      email: 'john.doe@example.com',
      password: 'XXXXXX',
      responsible: 'John Doe',
      whatsapp: '+5511999999999',
    })

    expect(org).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        address: 'SHVP Trecho 3 Ch. 128, 15',
        cep: '72001795',
      }),
    )
  })

  it('should not be possible to create an organization with the same email', async () => {
    await sto.execute({
      address: 'SHVP Trecho 3 Ch. 128, 15',
      cep: '72001795',
      email: 'john.doe@example.com',
      password: 'XXXXXX',
      responsible: 'John Doe',
      whatsapp: '+5511999999999',
    })

    await expect(
      sto.execute({
        address: 'SHVP Trecho 3 Ch. 128, 15',
        cep: '72001795',
        email: 'john.doe@example.com',
        password: 'XXXXXX',
        responsible: 'John Doe',
        whatsapp: '+5511999999999',
      }),
    ).rejects.toThrow()
  })

  it('should not be possible to create an organization without address or whatsapp', async () => {
    await expect(
      sto.execute({
        address: undefined as unknown as string,
        cep: '72001795',
        email: 'john.doe@example.com',
        password: 'XXXXXX',
        responsible: 'John Doe',
        whatsapp: undefined as unknown as string,
      }),
    ).rejects.toThrow()
  })
})
