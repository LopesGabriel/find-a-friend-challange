import { makeListPetUseCase } from '@/use-cases/factories/make-list-pet-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function list(request: FastifyRequest, reply: FastifyReply) {
  const pathSchema = z.object({ city: z.string() })
  const querySchema = z.object({
    age: z
      .enum([
        'NEWBORN',
        'JUNIOR',
        'PRE_TEEN',
        'TEEN',
        'POST_TEEN',
        'FULL_GROWN',
      ])
      .optional(),
    size: z.enum(['SMALL', 'MEDIUM', 'LARGE']).optional(),
    energyLevel: z.enum(['LOW', 'MEDIUM', 'HIGH']).optional(),
    independencyLevel: z.enum(['LOW', 'MEDIUM', 'HIGH']).optional(),
  })

  const data = {
    ...pathSchema.parse(request.params),
    ...querySchema.parse(request.query),
  }
  const useCase = makeListPetUseCase()
  const pets = await useCase.execute(data)

  return reply.status(200).send({ data: pets })
}
