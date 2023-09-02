import { makeCreateOrgUseCase } from '@/use-cases/factories/make-create-org-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const bodySchema = z.object({
    responsible: z.string(),
    email: z.string(),
    cep: z.string(),
    address: z.string(),
    whatsapp: z.string(),
    password: z.string(),
  })

  const data = bodySchema.parse(request.body)
  const useCase = makeCreateOrgUseCase()
  const org = await useCase.execute(data)

  return reply.status(201).send(org)
}
