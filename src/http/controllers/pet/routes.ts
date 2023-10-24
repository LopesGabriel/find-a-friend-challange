import { FastifyInstance } from 'fastify'
import { create } from './create'
import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { list } from './list'
import { get } from './get'

export async function petRoutes(app: FastifyInstance) {
  app.post('/pet', { onRequest: [verifyJWT] }, create)
  app.get('/pet/:id', { onRequest: [verifyJWT] }, get)
  app.get('/pet/filter/:city', { onRequest: [verifyJWT] }, list)
}
