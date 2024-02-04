


const SetupKafka = {
    clientConfig:{
        clientId: 'my-app',
        brokers: [process.env.KAFKA_BROKER || 'localhost:9092']
    },
    consumers:[
        {
            consumerConfig: {
                groupId: process.env.KAFKA_CONSUMER_GROUP || 'test-group'
            },
            subscription: {
                topics: ['test-topic'],
                fromBeginning: false
            },
            runConfig: {
                eachMessage: async ({ message }) => {
                    console.log(`Consumed message: ${message.value}`);
                }
            }
        }
    ]
    
}

export default SetupKafka;