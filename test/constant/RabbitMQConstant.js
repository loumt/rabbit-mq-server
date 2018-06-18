


class RabbitMQConstant{}

RabbitMQConstant.EXCHANGE = {
    TYPE:{
        TOPIC:'topic',
        DIRECT:'direct',
        FANOUT:'fanout',
        HEADERS:'headers'
    }
}


module.exports = RabbitMQConstant;