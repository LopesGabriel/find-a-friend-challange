import { makeCreatePetUseCase } from '@/use-cases/factories/make-create-pet-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const bodySchema = z.object({
    age: z.enum([
      'NEWBORN',
      'JUNIOR',
      'PRE_TEEN',
      'TEEN',
      'POST_TEEN',
      'FULL_GROWN',
    ]),
    energy: z.enum(['LOW', 'MEDIUM', 'HIGH']),
    environment: z.string(),
    independencyLevel: z.enum(['LOW', 'MEDIUM', 'HIGH']),
    name: z.string(),
    requisits: z.string().array(),
    size: z.enum(['SMALL', 'MEDIUM', 'LARGE']),
    about: z.string().optional(),
  })

  const data = bodySchema.parse(request.body)
  const useCase = makeCreatePetUseCase()
  const pet = await useCase.execute({
    ...data,
    orgId: request.user.sub,
  })

  return reply.status(201).send({ data: pet })
}
