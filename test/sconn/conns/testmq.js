
const config =require('./../config/mq')
const RabbitMQChannel = require('./../../../RabbitMQ/RabbitMQChannel')

let producer = new RabbitMQChannel(config)
//
// producer.initChannel().then(result=>{
//
//     producer.createCustomer(producer.queueName + '.reply',(msg)=>{
//         console.log('[Reply Message]:' + msg.content.toString());
//         producer.ack(msg);
//     })
//
//     // producer.send2Queue(producer.queueName,{type:'app',connId:171},{replyTo:producer.queueName + '.reply'})
//
//     let server = {type:'server',wstProxy:{hostname:'192.168.16.66',port:'8080',process_id:'123456'}}
//     producer.send2Queue(producer.queueName,server,{replyTo:producer.queueName + '.reply'})
// }).catch(e=>{
//     console.log(e);
// })
producer.initChannel().then(result=>{
    setInterval(()=>{
        producer.checkQueue('rabbit.mq.server.topic.123456').then((queue)=>{
            console.log('OK')
        }).catch(e=>{
            // console.dir(e.Error)
            // console.dir(e);
        })
    },2000)
}).catch(e=>{
     // console.log(e);
 })

