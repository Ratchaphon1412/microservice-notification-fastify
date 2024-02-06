import { sendNotification } from "../utils/notification/mail.js";
import fs from "fs";
import handlebars from 'handlebars';


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
        const html = await fastifyInstance.render("verifyemail", { link: "https://google.com",email:"sevenknight5570@gmail.com",logo:"https://merakiui.com/images/full-logo.svg" });

        
        sendNotification(nodemailer,"pixelman@ratchaphon1412.co","sevenknight5570@gmail.com","Verify Email - Pixelman Thailand",html)

    })

    

    
next();
     
}

export default router;