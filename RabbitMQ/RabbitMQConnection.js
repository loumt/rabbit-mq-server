"use strict";
const amqplib = require('amqplib');
const {connect} = require('../configure/index').rabbit
const {EventEmitter} = require('events')
const DefaultOptions = {
    protocol: 'amqp',
    hostname: 'localhost',
    port: '5672',
    username: 'guest',
    password: 'guest'
}

/**
 * MQ连接工具
 */
class MQConnection extends EventEmitter {
    constructor(options) {
        super();
        this.connection = null
        this.options = {}
        Object.assign(this.options, DefaultOptions, options)
    }

    /**
     * RabbitMQ连接
     * @returns {Promise}
     */
    getOrCreateConnection(){
        return new Promise((resolve,reject)=>{
            if(this.connection){
                resolve(this.connection);
            }else{
                amqplib.connect(this.options).then(connect=> {
                    this.emit('connection-ready',connect)
                    this.connection = connect
                    resolve(this.connection)
                }).catch(error => {
                    this.emit('connection-error',error)
                    reject(error)
                })
            }
        })
    }
}

module.exports = new MQConnection(connect)

