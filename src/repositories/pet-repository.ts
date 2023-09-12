import {
  EnergyLevel,
  IndependencyLevel,
  Pet,
  PetAge,
  PetSize,
  Prisma,
} from '@prisma/client'

export interface IFindPetsArgs {
  orgIds: string[]

  size?: PetSize
  energyLevel?: EnergyLevel
  age?: PetAge
  independencyLevel?: IndependencyLevel
}

export interface IPetRepository {
  create(data: Prisma.PetCreateInput): Promise<Pet>
  findPets(data: IFindPetsArgs): Promise<Pet[]>
  findById(id: string): Promise<Pet | null>
}
