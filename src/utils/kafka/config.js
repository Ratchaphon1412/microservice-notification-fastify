


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
                topics: ['test'],
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
    

// export const configKafka = {
//     producer: {
//       'metadata.broker.list': 'kafka:9092',
//       'group.id': "email-service",
//       'fetch.wait.max.ms': 10,
//       'fetch.error.backoff.ms': 50,
//       'dr_cb': true
//     },
//     consumer: {
//       'metadata.broker.list': 'kafka:9092',
//       'group.id':"email-service",
//       'fetch.wait.max.ms': 10,
//       'fetch.error.backoff.ms': 50,
//       'auto.offset.reset': 'earliest'
//     }
//   }
