const RMTunnelConnection  = require('./RMTunnelConnection')
const SconnHandler  = require('./handlers/SconnHandler')

/**
 * Vapp服务发现
 */
class SconnServer{
    constructor(handlers){
        this.handlers = handlers;
    }

    /**
     *
     * @param queueName
     * @param msgHandler
     * @param eventsTriggers
     */
    register(queueName,eventsTriggers = {}){

        RMTunnelConnection.getInstanceConnection().then(connection=>{
            return connection.createChannel()
        }).then(channel=>{
            this.channel = channel;

            this.channel.on('close',eventsTriggers['channel-close'] || this.channelInfo('close'))
            this.channel.on('error',eventsTriggers['channel-error'] || this.channelInfo('error'))
            this.channel.on('return',eventsTriggers['channel-return'] || this.channelInfo('return'))
            this.channel.on('drain',eventsTriggers['channel-drain'] || this.channelInfo('drain'))

            this.channel.consume(queueName,this.spreadCustom,{noAck:true})

        }).catch(e=>{
            console.log(e);
        })
    }


    spreadCustom(msg){
        let model = JSON.parse(msg.content.toString())

        if(model && model['opCode'] && model['opCode'] in this.handlers){
            this.handlers[model['opCode']](msg,this);
        }else{
            console.log('cant pattern type ' + model['opCode']);
        }

    }

    replyToQueue(replyQueue,model){
        this.channel.sendToQueue(replyQueue,new Buffer(JSON.stringify(model)),{noAck:true})
    }

    channelInfo(msg){
        return ()=>{
            console.log(`RabbitMQ Channel [discover sconn] ${msg}`);
        }
    }
}



module.exports = SconnServer;