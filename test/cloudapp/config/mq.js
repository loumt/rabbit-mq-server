module.exports  = {
    routingKey: 'rabbit.mq.server.topic.*',
    bindKey: 'rabbit.mq.server.topic.123456',
    exchange: {
        type: 'topic',
        name: 'server.exchange.topic.test',
        options:{

        }
    },
    queue: {
        name: 'rabbit.mq.server.topic.123456',
        options:{
            autoDelete:true
        }
    },
    replyQueue: 'rabbit.mq.server.reply.to'
}