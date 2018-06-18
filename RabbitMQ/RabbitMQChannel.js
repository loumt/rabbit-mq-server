"use strict";
const {EventEmitter} = require('events')
const rabbitMQConnection = require('./RabbitMQConnection')


/**
 * RabbitMQ频道
 *
 * object#queueName
 * object#queueOptions
 *
 * object#exchangeName
 * object#exchangeType
 * object#exchangeOptions
 *
 * object#routingKey
 * object#bindKey
 *
 * object#channel
 * object#exchange
 */
class RabbitMQChannel extends EventEmitter {

    /**
     * @param queueName
     * @param queueOpts {autoDelete: true}
     */
    constructor(options) {
        super()
        this.initParams(options)
    }

    /**
     * 初始化连接参数
     */
    initParams(options) {
        try {
            if (options.queue) {
                this.bindKey = options.bindKey;
                this.queueName = options.queue.name
                this.queueOptions = options.queue.options
            }

            if (options.exchange) {
                this.routingKey = options.routingKey;
                this.exchangeName = options.exchange.name;
                this.exchangeType = options.exchange.type
                this.exchangeOptions = options.exchange.options;
            }

        } catch (e) {
            console.log(e);
        }
    }


    /**
     * 初始化
     * return Promise
     */
    initChannel() {
        return new Promise((res, rej) => {
            rabbitMQConnection.getOrCreateConnection().then((connection) => {
                return connection.createChannel()
            }).then((channel) => {
                this.channel = channel

                this.channel.on('close',()=>{console.log('channel close....')})
                this.channel.on('error',(e)=>{
                    console.log('channel error....');
                    // console.log(e);
                })
                this.channel.on('return',()=>{console.log('channel return....')})
                this.channel.on('drain',()=>{console.log('channel drain....')})

                let tasks = [];
                if (this.queueName) {
                    tasks.push(this.createQueue())
                }
                if (this.exchangeName) {
                    tasks.push(this.createExchange())
                }
                return Promise.all(tasks)
            }).then(()=>{res(this.channel)}).catch(rej)
        })
    }

    /**
     * 初始化队列并将队列绑定到该交换机
     */
    createQueue() {
        return this.channel.assertQueue(this.queueName, this.queueOptions)
    }

    /**
     * autoDelete(if binding === 0)
     * internal (can not to send message to exchange)
     * durable (is survive when server restart)
     */
    createExchange() {
        return this.channel.assertExchange(this.exchangeName, this.exchangeType, this.exchangeOptions)
    }

    /**
     * 将队列绑定至交换机上
     */
    bindQueueToExchange(queueName, exchangeName, bindKey) {
        return this.channel.bindQueue(queueName, exchangeName, bindKey)
    }

    /**
     * 解绑交换机
     */
    unbindQueueFromExchange(queueName, exchangeName, bindKey) {
        return this.channel.unbindQueue(queueName, exchangeName, bindKey)
    }

    /**
     * 消费者
     * @param queueName
     * @param customerHandler
     */
    createCustomer(queueName, customerHandler) {
        this.channel.consume(queueName, customerHandler)
    }

    /**
     * 发送至交换机
     * @param exchangeName
     * @param routingKey
     * @param model
     * @param opts
     */
    send2Exchange(exchangeName, routingKey, model, opts) {
        this.channel.publish(exchangeName, routingKey, new Buffer(JSON.stringify(model)), opts)
    }

    /**
     * 发送至队列
     * @param queueName
     * @param model
     * @param opts
     */
    send2Queue(queueName, model, opts) {
        this.channel.sendToQueue(queueName, new Buffer(JSON.stringify(model)), opts)
    }

    ack(msg) {
        this.channel.ack(msg)
    }

    checkQueue(queueName) {
        // if(!queueName || !this.queueName){
        //     return
        // }
        return this.channel.checkQueue(queueName || this.queueName)
    }

    purgeQueue() {
        this.channel.purgeQueue(this.queueName);
    }

    getChannel() {
        if (this.channel) {
            return this.channel
        }
        return null;
    }

    close() {
        this.channel.close(err => {
        })
    }

    deleteQueue() {
        this.channel.deleteQueue(this.queueName)
    }

    deleteExchange() {
        this.channel.deleteExchange(this.exchangeName)
    }

    destroyChannel() {
        if (this.channel) {
            this.deleteQueue();
            this.deleteExchange()
            this.close()
        }
    }
}

module.exports = RabbitMQChannel;