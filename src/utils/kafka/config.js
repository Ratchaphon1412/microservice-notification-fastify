import {fastify} from "../../../main.js";
import { sendNotification } from "../notification/mail.js";

export const configKafka = {
    clientConfig:{
        clientId: 'email-service',
        brokers: [process.env.KAFKA_BROKER || 'kafka:9092']
    },
    consumers:[
        {
            consumerConfig: {
                groupId: process.env.KAFKA_CONSUMER_GROUP || 'email-service'
            },
            subscription: {
                topics: ['email-service-topic'],
                fromBeginning: false
            },
            runConfig: {
                eachMessage: async ({ message }) => {
                    console.log(`Consumed message: ${message.value} on partition ${message.partition}  with offset ${message.offset}  from topic ${message.topic} key ${message.key}`);
                    let { nodemailer } = fastify;
                    console.log("Received message: " + message.value);

                    if (message.key == "verify"){
                        const messageJson = JSON.parse(message.value);
                        const html = await fastify.render("verifyemail", { link: messageJson.link});
                        console.log("Send email to " + messageJson.to);
                        sendNotification(nodemailer, "pixelman@ratchaphon1412.co", messageJson.to, "Verify Email - PixelMan Shop Thailand", html);

                    }else if (message.key == "re-verify"){
                        const messageJson = JSON.parse(message.value);
                        const html = await fastify.render("re-verify", { link: messageJson.link});
                        console.log("Send email to " + messageJson.to);
                        sendNotification(nodemailer, "pixelman@ratchaphon1412.co", messageJson.to, "Re-Verify Email - PixelMan Shop Thailand", html);
                    }
                   
                }


            }
        }
    ]
}
    

