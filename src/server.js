import Fastify from 'fastify';
import fastifyKafkaJS from 'fastify-kafkajs'
import fastifyGracefulShutdown from "fastify-graceful-shutdown"
import router from './controller/router.js'
import {configKafka} from './utils/kafka/config.js'

const { ADDRESS = 'localhost', PORT = 3000 } = process.env;

export const fastify = Fastify({ logger: true })
  fastify.register(fastifyGracefulShutdown) 
  fastify.register(fastifyKafkaJS,configKafka)
  fastify.register(router)
  

export async function start() {
    fastify.listen({ host: ADDRESS, port: parseInt(PORT, 10) }, (err, address) => {
    if (err) {
      console.error(err)
      process.exit(1)
    }
    console.log(`Server listening at ${address}`)
  })
}

