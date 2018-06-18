module.exports = {
    connect: {
        hostname: '192.168.0.103',
        port: '5672',
        username: 'guest',
        password: 'guest'
    },
    params: {
        routingKey: 'rabbit.mq.server.topic.test',
        bindKey: 'rabbit.mq.server.topic.test',
        exchange: {
            type: 'direct',
            name: 'server.exchange.topic.test',
            options: {}
        },
        queue: {
            name: 'rabbit.mq.server.topic.test',
            options: {}
        },
        replyQueue: 'rabbit.mq.server.reply.to'
    }
}