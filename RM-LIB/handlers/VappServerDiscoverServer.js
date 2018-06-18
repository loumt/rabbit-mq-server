"use strict";



/**
 * Vapp服务发现
 * @param msg
 * @param RMServer
 */
module.exports =  (msg,thiz) => {
    let info = msg.content.toString();

    let replyQueue = msg.properties.replyTo;

    console.log('Receive message : ' + info);
    console.log('Reply Queue is : ' + replyQueue);

    let model = JSON.parse(info);


    thiz.replyToQueue(replyQueue, {success: true})
}
