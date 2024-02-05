import Fastify from 'fastify';
import fastifyKafkaJS from 'fastify-kafkajs'
import fastifyGracefulShutdown from "fastify-graceful-shutdown"
import {configKafka} from './src/utils/kafka/config.js'

import fastify_nodemailer from "fastify-nodemailer"
import {mailConfig} from './src/utils/notification/config.js'
import router from './src/controller/router.js'


const { ADDRESS = '0.0.0.0', PORT = 3000 } = process.env;

const fastify = Fastify({ logger: true })

fastify.register(fastifyKafkaJS,configKafka)
fastify.register(fastifyGracefulShutdown) 
fastify.register(fastify_nodemailer,mailConfig )
fastify.register(router)
  


const start = async () => {
    try {
      
      await fastify.listen({ port: PORT, host: ADDRESS })
      
    } catch (err) {
      fastify.log.error(err)
      process.exit(1)
    }

    fastify.log.info(`server listening on ${fastify.server.address().port}`)
  }

start()

