"use strict";
const MQHandler = require('./MQHandler')
const uuid = require('uuid/v1')
const {connect, params} = require('./../configure/index').rabbit

class MQPublisherHandler extends MQHandler{
    constructor(options, params) {
        super(options, params)
    }

    send(content){
        this.id = uuid();

        this.sendMsgToQueueWithReply(params.queueName,params.replyQueue,{id:id,content:content})

        this.createReplyCutomer(this.replyHandler)
    }

    replyHandler(msg){
        console.log(`Get replyMessage  ${msg.content.toString()}`);
    }

    createReplyCutomer(replyHandler){
        this.customerHandler(this.params.replyQueue,replyHandler)
    }
}

let publishHandler = new MQPublisherHandler(connect, params)

publishHandler.on('ready',()=>{
    console.log('publish ready!');
})


module.exports = publishHandler;