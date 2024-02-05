

async function router(fastify,options){
    fastify.get('/', async function handler (request, reply) {
        return { hello: 'world' }
      });
    fastify.get('/produce',async function handler(request,reply){
        
        return {message: 'message sent'}
    })
    

     
}

export default router;