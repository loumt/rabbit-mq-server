"use strict";
const MQHandler = require('./MQHandler')
const uuid = require('uuid/v1')

class MQPublisherHandler extends MQHandler{
    constructor(options, params) {
        super(options, params)
        this.id = uuid();
    }

    /**
     * 发送消息
     * @param model(Object)
     */
    send(model){
        if(model['id'] || !(typeof model ==='object')){
            return console.log('RabbitMQ Msg UnSupport!');
        }
        //send a message user reply
        this.sendMsgToQueueWithReply(this.id,this.params.queueName,new Buffer(JSON.stringify(model)))

        //reply handler
        this.createReplyCustomer(this.replyHandler)
    }

    createReplyCustomer(replyHandler){
        this.customerHandler(this.params.replyQueue,replyHandler)
    }

    replyHandler(msg){
        console.log(`Get replyMessage  ${msg.content.toString()}`);
    }
}

module.exports = MQPublisherHandler;