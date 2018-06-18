"use strict";

const MQHandler = require('./MQHandler')

class MQCustomerHandler extends MQHandler {
    constructor(options, params) {
        super(options, params)
    }

    bindExchangeToQueue(){
        return this.channel.bindQueue(this.params.queueName,this.params.exchange.name,this.params.bindKey)
    }

    createConsume() {
        this.createReplyQueue(this.params.replyQueue);

        this.channel.consume(this.params.queueName, (msg)=>{
            this.customerHandler(msg)
            this.replyToPublisher(msg.properties.correlationId, msg.properties.replyTo,new Buffer('This is a reply message!!!!'))
        })
    }

    customerHandler(msg){
        console.dir(JSON.parse(msg.content.toString()));
    }

    replyToPublisher(correlationId,replyQueue,content){
        this.channel.sendToQueue(replyQueue,content,{correlationId:correlationId});
    }
}

module.exports = MQCustomerHandler;