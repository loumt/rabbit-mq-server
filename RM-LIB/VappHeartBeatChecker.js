const RMTunnelConnection  = require('./RMTunnelConnection')

/**
 * Vapp心跳检测
 */
class VappHeartBeatChecker{
    constructor(){

    }

    /**
     * 注册
     * @param queueName
     * @param msgHandler
     * @param eventsTriggers
     */
    register(queueName,eventsTriggers = {}){

        if(!eventsTriggers || !eventsTriggers['channel-close'])

        RMTunnelConnection.getInstanceConnection().then(connection=>{
            return connection.createChannel()
        }).then(channel=>{
            this.channel = channel;

            this.channel.on('close',eventsTriggers['channel-close'])
            this.channel.on('error',this.channelInfo('error'))
            this.channel.on('return',eventsTriggers['channel-return'] || this.channelInfo('return'))

            this.channel.checkQueue(queueName)
        }).catch(e=>{
            console.log(e);
        })
    }

    replyToQueue(replyQueue,model){
        this.channel.sendToQueue(replyQueue,new Buffer(JSON.stringify(model)),{noAck:true})
    }

    channelInfo(msg){
        return ()=>{
            console.log(`RabbitMQ Channel [sconn app params] ${msg}`);
        }
    }
}


module.exports = VappHeartBeatChecker;