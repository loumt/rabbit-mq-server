
module.exports = {
    server:{
        port:4000
    },
    rabbit:{
        connect:{
            hostname:'192.168.16.66',
            port:'5672',
            username:'guest',
            password:'guest'
        },
        params:{
            routingKey: 'rabbit.mq.server.topic.test',
            bindKey: 'rabbit.mq.server.topic.test',
            exchange: {
                type: 'direct',
                name: 'server.exchange.topic.test',
            },
            queueName: 'rabbit.mq.server.topic.test',
            replyQueue:'rabbit.mq.server.reply.to'
        },
        roleType:{
            Consumer:1
        }
    }
}