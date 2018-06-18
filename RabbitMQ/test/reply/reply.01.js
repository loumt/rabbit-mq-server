"use strict";

const MQChannel  = require('../../RabbitMQChannel')
const ChannelPool  = require('../../pool/ChannelPool')

const params1 = {
    routingKey: 'rabbit.mq.server.topic.654321',
    exchange: {
        type: 'topic',
        name: 'server.exchange.topic.reply',
        options: {}
    },
    queue:{
        name:'rabbit.mq.server.topic.reply'
    },
    replyTo:'rabbit.mq.server.topic.reply.queue'
}

let processId = 160;
const channel01 = new MQChannel(params1);

channel01.initChannel().then((result)=>{
    console.log(`${processId} topic start....`);
    // console.dir(result)

    // channel01.bindQueueToExchange(channel01.queueName,channel01.exchangeName,channel01.bindKey)

    channel01.createCustomer(channel01.queueName,(msg)=>{
        // console.log(processId + 'Get Reply Message ......' + msg.content.toString());
        // console.log(`reply queue : ${msg.properties.replyTo}`);
        channel01.send2Queue(msg.properties.replyTo,{content:'This is a Reply Message!'})
        channel01.ack(msg)
    })
}).catch(e=>{
    console.log(e);
})


module.exports = {
    processId:processId,
    channel: channel01
}