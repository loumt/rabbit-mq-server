const {EventEmitter} = require('events')
const amqp = require('amqplib')

const {connect:connectParams} = require('../configure/rabbit.mq')

class RMTunnelConnection extends EventEmitter {
    constructor(options) {
        super();
        this.options = options;
        this.initConnection();
    }

    /**
     * 初始化连接
     */
    initConnection(){
        amqp.connect(this.options).then(connection=>{
            this.emit('connection-ready')
            this.singleConnection = connection
        }).catch(e=>{
            this.emit('connection-error',()=>{console.log(e)})
        });
    }


    /**
     * @returns {Promise}
     */
    getInstanceConnection() {
        return new Promise((res,rej)=>{
            if(this.singleConnection){
                res(this.singleConnection);
            }else{
                amqp.connect(this.options).then(connection=>{
                    this.emit('connection-ready')
                    this.singleConnection = connection
                    res(this.singleConnection);
                }).catch(e=>{
                    this.emit('connection-error',()=>{console.log(e)})
                    rej(e);
                });
            }
        })

    }
}

module.exports =  new RMTunnelConnection(connectParams)
