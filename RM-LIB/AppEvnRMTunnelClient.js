const RMTunnelConnection  = require('./RMTunnelConnection')

/**
 * 处理App参数消息
 */
class AppEvnRMTunnelClient{
    constructor(){
    }

    /**
     * 将App状态发送至Queue
     * @param queueNames
     * @param msgModel
     */
    sendAppStateMsgsToQueues(queueNames,msgModel){
        RMTunnelConnection.getInstanceConnection().then(connection=>{
            return connection.createChannel()
        }).then(channel=>{
            this.channel = channel

            this.channel.on('close',this.channelInfo('close'))
            this.channel.on('error',this.channelInfo('error'))
            this.channel.on('return',this.channelInfo('return'))
            this.channel.on('drain',this.channelInfo('drain'))

            queueNames.forEach(queueName=>{
                this.channel.sendToQueue(queueName,new Buffer(JSON.stringify(msgModel)),{noAck:true})
            })
            this.channelClose()
        }).catch(e=>{
            console.log(e)
        })
    }

    /**
     * 将App状态发送至Exchange
     * @param queueNames
     * @param msgModel
     */
    sendAppStateMsgsToExchanges(exchangeName,routingKey,msgModel){
        RMTunnelConnection.getInstanceConnection().then(connection=>{
            return connection.createChannel()
        }).then(channel=>{
            this.channel = channel

            this.channel.on('close',this.channelInfo('close'))
            this.channel.on('error',this.channelInfo('error'))
            this.channel.on('error',this.channelInfo('return'))
            this.channel.on('error',this.channelInfo('drain'))

            this.channel.publish(exchangeName,routingKey,new Buffer(JSON.stringify(msgModel)))

            this.channelClose()
        }).catch(e=>{
            console.log(e)
        })
    }



    channelClose(){
        this.channel.close()
    }

    channelInfo(msg){
        return ()=>{
            console.log(`RabbitMQ Channel [sconn app state] ${msg}`)
        }
    }
}

module.exports = AppEvnRMTunnelClient;