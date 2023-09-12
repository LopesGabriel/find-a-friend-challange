import { IOrgRepository } from '@/repositories/org-repository'
import { IPetRepository } from '@/repositories/pet-repository'
import { EnergyLevel, IndependencyLevel, PetAge, PetSize } from '@prisma/client'

interface IExecuteArgs {
  orgId: string
  age: PetAge
  energy: EnergyLevel
  environment: string
  independencyLevel: IndependencyLevel
  name: string
  size: PetSize
  requisits: string[]

  about?: string
}

export class CreatePetUseCase {
  constructor(
    private readonly petRepository: IPetRepository,
    private readonly orgRepository: IOrgRepository,
  ) {}

  async execute(data: IExecuteArgs) {
    const org = await this.orgRepository.getById(data.orgId)
    if (!org) {
      throw new Error('Org not found')
    }

    const pet = await this.petRepository.create({
      age: data.age,
      energy: data.energy,
      environment: data.environment,
      independencyLevel: data.independencyLevel,
      name: data.name,
      size: data.size,
      about: data.about,
      requisits: data.requisits,
      org: {
        connect: {
          id: org.id,
        },
      },
    })

    return pet
  }
}
