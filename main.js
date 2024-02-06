import Fastify from 'fastify';
import fastifyKafkaJS from 'fastify-kafkajs'
import fastifyGracefulShutdown from "fastify-graceful-shutdown"
import {configKafka} from './src/utils/kafka/config.js'

import fastify_nodemailer from "fastify-nodemailer"
import {mailConfig} from './src/utils/notification/config.js'
import fastifyView from '@fastify/view/index.js'
import Handlebars from "handlebars";


import router from './src/controller/router.js'


const { ADDRESS = '0.0.0.0', PORT = 3000 } = process.env;

export const fastify = Fastify({ logger: true })


fastify.register(fastifyGracefulShutdown) 
fastify.register(fastify_nodemailer,mailConfig )
fastify.register(fastifyView, {
  engine: {
    handlebars: Handlebars
  },
  root: "./src/view",
  viewExt: "handlebars",
  propertyName: "render", // The template can now be rendered via `reply.render()` and `fastify.render()`
  defaultContext: {
    dev: process.env.NODE_ENV === "development", // Inside your templates, `dev` will be `true` if the expression evaluates to true
  },
  options: {}, // No options passed to handlebars
})

fastify.register(fastifyKafkaJS, 
  configKafka
  
  );
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

