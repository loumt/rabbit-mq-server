const amqplib = require('amqplib');
const _ = require('lodash')
const {EventEmitter} = require('events')
const {server} = require('../configure/index')
const DefaultOptions = {
    protocol: 'amqp',
    hostname: 'localhost',
    port: '5672',
    username: 'guest',
    password: 'guest'
}

/**
 * RabbitMq
 * event:{
 *     connect:连接成功
 *     connect-close:连接关闭
 *     connect-error:连接错误
 *
 *     channel-ready:通道创建成功
 *     channel-error:通道发生错误
 *     channel-close:通道关闭
 *     channel-create-error:通道创建失败
 *
 *     queue-ready:队列创建成功
 *     queue-create-error:队列创建失败
 *
 *     exchange-ready:交换机准备就绪
 *     exchange-create-error:交换机创建失败
 *
 *     ready:准备就绪
 * }
 */
class MQHandler extends EventEmitter {
    constructor(options, params) {
        super();
        this.option = {}
        this.params = {};
        this.connection = null;
        this.channel = null;
        _.assign(this.option, DefaultOptions, options)
        _.assign(this.params, params)
        this.connect();
    }

    connect() {
        let connectPromise = amqplib.connect(this.option)
        connectPromise.then((connect) => {
            this.onconnect(connect);
        }).catch(error => {
            this.emit('connect-error',error)
        })
    }

    onconnect(connect) {
        this.emit('connect')
        console.log(`[${server.port}] RabbitMQ [${this.option.hostname}] is Connect!!!`);
        this.connection = connect;
        this.createChannel(connect)
    }

    close() {
        let closePromise = this.connection.close();
        closePromise.then(() => {
            this.onclose();
        })
    }

    onclose() {
        console.log('RabbitMq connection is closed!');
        this.emit('connect-close');
    }

    oncreateChannel(channel) {
        this.channel = channel;
        this.channel.on('close', () => {
            this.emit('channel-close')
        })
        this.channel.on('error', () => {
            this.emit('channel-error')
        })

        this.createQueue();
        this.createExchange();

        this.emit('ready')
    }

    oncreateChannelError(e) {
        this.emit('channel-create-error');
    }

    createChannel(connect) {
        let createChannelPromise = connect.createChannel();
        createChannelPromise.then(channel => {
            this.oncreateChannel(channel)
            this.emit('channel-ready');
        }).catch(e => {
            this.oncreateChannelError(e)
        })
    }

    createQueue() {
        let createQueuePromise = this.channel.assertQueue(this.params.queueName, {autoDelete: true});
        createQueuePromise.then((queue) => {
            // queue{queue,messageCount,consumerCount}
            this.emit('queue-ready')
        }).catch(e => {
            this.emit('queue-create-error')
        })
    }

    createExchange() {
        let createExchangePromise = this.channel.assertExchange(this.params.exchange.name, this.params.exchange.type, {
            durable: true,
            autoDelete: true
        })
        createExchangePromise.then((exchange)=>{
            this.emit('exchange-ready')
        }).catch(e=>{
            this.emit('exchange-create-error')
        })
    }

    deleteQueue() {
        this.channel.deleteQueue(this.params.queueName);
    }

    deleteExchange() {
        this.channel.deleteExchange(this.params.exchange.name);
    }
}

module.exports = MQHandler;