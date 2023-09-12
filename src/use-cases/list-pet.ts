import { IOrgRepository } from '@/repositories/org-repository'
import { IPetRepository } from '@/repositories/pet-repository'
import { EnergyLevel, IndependencyLevel, PetAge, PetSize } from '@prisma/client'

interface IExecuteArgs {
  city: string

  size?: PetSize
  energyLevel?: EnergyLevel
  independencyLevel?: IndependencyLevel
  age?: PetAge
}

export class ListPetUseCase {
  constructor(
    private readonly petRepository: IPetRepository,
    private readonly orgRepository: IOrgRepository,
  ) {}

  async execute(args: IExecuteArgs) {
    const orgs = await this.orgRepository.findByAddressContaining(args.city)

    const pets = await this.petRepository.findPets({
      orgIds: orgs.map((org) => org.id),
      size: args.size,
      energyLevel: args.energyLevel,
      age: args.age,
      independencyLevel: args.independencyLevel,
    })

    return pets
  }
}
