import { makeGetPetUseCase } from '@/use-cases/factories/make-get-pet-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function get(request: FastifyRequest, reply: FastifyReply) {
  const pathSchema = z.object({ id: z.string() })

  const { id } = pathSchema.parse(request.params)
  const useCase = makeGetPetUseCase()
  const pet = await useCase.execute({ petId: id })

  return reply.status(200).send({ data: pet })
}
