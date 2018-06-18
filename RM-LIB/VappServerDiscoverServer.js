const RMTunnelConnection  = require('./RMTunnelConnection')

/**
 * Vapp服务发现
 */
class VappServerDiscoverServer{
    constructor(){

    }

    /**
     *
     * @param queueName
     * @param msgHandler
     * @param eventsTriggers
     */
    register(queueName,msgHandler,eventsTriggers = {}){

        RMTunnelConnection.getInstanceConnection().then(connection=>{
            return connection.createChannel()
        }).then(channel=>{
            this.channel = channel;

            this.channel.on('close',eventsTriggers['channel-close'] || this.channelInfo('close'))
            this.channel.on('error',eventsTriggers['channel-error'] || this.channelInfo('error'))
            this.channel.on('return',eventsTriggers['channel-return'] || this.channelInfo('return'))
            this.channel.on('drain',eventsTriggers['channel-drain'] || this.channelInfo('drain'))

            this.channel.consume(queueName,msgHandler,{noAck:true})

        }).catch(e=>{
            console.log(e);
        })
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



module.exports = VappServerDiscoverServer;