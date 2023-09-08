import { FastifyInstance } from 'fastify'
import { create } from './create'
import { authenticate } from './authenticate'

export async function orgRoutes(app: FastifyInstance) {
  app.post('/org', create)
  app.post('/auth', authenticate)
}
