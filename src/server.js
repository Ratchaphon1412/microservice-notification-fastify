import Fastify from 'fastify';

import router from './controller/router.js'
import SetupKafka from './utils/broker/kafka.js'

const { ADDRESS = 'localhost', PORT = 3000 } = process.env;

export const fastify = Fastify({ logger: true })


  fastify.register(router)
  fastify.register(SetupKafka)

export function start() {
    fastify.listen({ host: ADDRESS, port: parseInt(PORT, 10) }, (err, address) => {
    if (err) {
      console.error(err)
      process.exit(1)
    }
    console.log(`Server listening at ${address}`)
  })
}

