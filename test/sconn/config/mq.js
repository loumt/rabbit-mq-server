
module.exports = {
    routingKey:'cloudapp.sconn.server.global.routing',
    bindKey:'cloudapp.sconn.server.global.bing',
    queue:{
        name:'cloudapp.sconn.server.queue',
        options:{
        }
    },
    exchange:{
        name:'cloudapp.sconn.server.exchange',
        type:'direct',
        options:{}
    }
}