

const router = async (fastifyInstance,options,next)=> {
    fastifyInstance.get('/', async function handler (request, reply) {
        return { hello: 'world' }
      });

    fastifyInstance.get('/producer', async function handler (request, reply) {
        fastifyInstance.kafka.producer.send({
            topic: 'test-topic',
            messages: [{ key: 'key1', value: "hello" }]
        });
        return { status: 'ok' }
    });
    
next();
     
}

export default router;