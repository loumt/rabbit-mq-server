"use strict";

const MQHandler = require('./MQHandler')
const {connect, params} = require('./../configure/index').rabbit
const NormalCustomer = require('./NormalCustomer')

class MQCustomerHandler extends MQHandler {
    constructor(options, params) {
        super(options, params)
    }

    bindExchangeToQueue(){
        return this.channel.bindQueue(params.queueName,params.exchange.name,params.bindKey)
    }

    createConsume() {
        this.createReplyQueue(params.replyQueue);

        this.channel.consume(this.params.queueName, (msg)=>{
            this.customer(msg)

            this.replyToPublisher(msg.properties.replyTo,new Buffer('This is a reply message!!!!'))
        })
    }

    customer(msg){
        console.log(`receive msg: ${msg.content.toString()}`);
    }

    replyToPublisher(replyQueue,content){
        this.channel.sendToQueue(replyQueue,content);
    }
}

let customerHandler = new MQCustomerHandler(connect, params)

customerHandler.on('ready',()=>{

    customerHandler.bindExchangeToQueue().then(()=>{
        //创建消费者
        customerHandler.createConsume();
    }).catch(e=>{
        console.log(e);
    });
})

module.exports = customerHandler;