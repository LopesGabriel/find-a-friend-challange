import { IPetRepository } from '@/repositories/pet-repository'
import {
  EnergyLevel,
  IndependencyLevel,
  Org,
  PetAge,
  PetSize,
} from '@prisma/client'

export interface ICreateTestPetProps {
  petRepository: IPetRepository
  org: Org

  age?: PetAge
  energy?: EnergyLevel
  environment?: string
  independencyLevel?: IndependencyLevel
  name?: string
  requisits?: string[]
  size?: PetSize
  about?: string
}

export async function createTestPet({
  petRepository,
  org,
  ...data
}: ICreateTestPetProps) {
  const pet = await petRepository.create({
    age: data.age ?? 'JUNIOR',
    energy: data.energy ?? 'MEDIUM',
    environment: data.environment ?? 'SMALL',
    independencyLevel: data.independencyLevel ?? 'MEDIUM',
    name: data.name ?? 'Maia Pinscher',
    org: { connect: { id: org.id } },
    requisits: data.requisits ?? ['Be patient'],
    size: data.size ?? 'SMALL',
    about:
      data.about ??
      'Maia is a pinscher that loves to play it does a lot of noise',
  })

  return pet
}
