
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
            routingKey: 'rabbit.mq.server',
            bindKey: 'rabbit.mq.server',
            exchange: {
                type: 'topic',
                name: 'server.exchange',
            },
            queueName: 'rabbit.mq.server',
        },
        roleType:{
            Consumer:1
        }
    }
}