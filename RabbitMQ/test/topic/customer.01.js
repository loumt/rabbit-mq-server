"use strict";

const MQChannel  = require('../../RabbitMQChannel')
const ChannelPool  = require('../../pool/ChannelPool')

const params = {
    routingKey: 'rabbit.mq.server.topic.123456',
    bindKey: 'rabbit.mq.server.topic.#',
    exchange: {
        type: 'topic',
        name: 'server.exchange.topic.test',
        options:{

        }
    },
    queue: {
        name: 'rabbit.mq.server.topic.123456',
        options:{

        }
    },
    replyQueue: 'rabbit.mq.server.reply.to'
}

let processId = 150;

const channel01 = new MQChannel(params);

channel01.initChannel().then((result)=>{
    console.log(`${processId} topic start....`);
    // console.dir(result)
    ChannelPool.put(processId,channel01)

    channel01.bindQueueToExchange(channel01.queueName,channel01.exchangeName,channel01.bindKey)

    channel01.createCustomer(channel01.queueName,(msg)=>{
        console.log(processId + 'Get Message ......' + msg.content.toString());
        channel01.ack(msg)
    })
}).catch(e=>{
    console.log(e);
})


module.exports = {
    processId:processId,
    channel: channel01
}