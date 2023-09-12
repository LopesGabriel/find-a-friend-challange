import { IPetRepository } from '@/repositories/pet-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface IExecuteArgs {
  petId: string
}

export class GetPetUseCase {
  constructor(private readonly petRepository: IPetRepository) {}

  async execute({ petId }: IExecuteArgs) {
    const pet = await this.petRepository.findById(petId)

    if (!pet) {
      throw new ResourceNotFoundError()
    }

    return pet
  }
}
