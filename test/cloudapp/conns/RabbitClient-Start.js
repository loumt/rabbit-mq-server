
const config =require('./../config/mq')
const RabbitMQChannel = require('./../../../RabbitMQ/RabbitMQChannel')

let customer = new RabbitMQChannel(config)

customer.initChannel().then(()=>{
    console.log('11111');
    setTimeout(()=>{
        customer.destroyChannel()
    },10000)
}).catch(e=>{
    console.log(e);
})

