import { FastifyInstance } from 'fastify'
import { create } from './create'
import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { list } from './list'

export async function petRoutes(app: FastifyInstance) {
  app.post('/pet', { onRequest: [verifyJWT] }, create)
  app.get('/pet/:city', { onRequest: [verifyJWT] }, list)
}
