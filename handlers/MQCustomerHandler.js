"use strict";

const MQHandler = require('./MQHandler')
const {connect, params} = require('./../configure/index').rabbit
const NormalCustomer = require('./NormalCustomer')

class MQCustomerHandler extends MQHandler {
    constructor(options, params) {
        super(options, params)
    }

    createConsume(fun) {
        this.channel.consume(this.params.queueName, fun.bind(this))
    }
}

let customerHandler = new MQCustomerHandler(connect, params)

customerHandler.on('ready',()=>{
    //创建消费者
    customerHandler.createConsume(NormalCustomer.consume);
})

module.exports = customerHandler;