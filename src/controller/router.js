import { sendNotification } from "../utils/notification/mail.js";

const router = async (fastifyInstance,options,next)=> {
    fastifyInstance.get('/', async function handler (request, reply) {
        return { hello: 'world' }
      });

    fastifyInstance.get('/producer', async function handler (request, reply) {
        fastifyInstance.kafka.producer.send({
            topic: 'test-topic',
            messages: [{ key: 'key1', value: "hello" }]
        });
        fastifyInstance.after(() => {
            fastify.gracefulShutdown((signal, next) => {
              console.log('Upps!')
              next()
            })
          })
        return { status: 'ok' }
    });

    fastifyInstance.get('/mail',async function handler (request, reply) {
        let { nodemailer } = fastifyInstance;
        sendNotification(nodemailer,"Test","sevenknight5570@gmail.com","Test","Test","Test")

    })

    

    
next();
     
}

export default router;