"use strict";

/**
 * App参数获取
 * @param msg
 * @param RMServer
 */
module.exports =  (msg,thiz) => {
    let info = msg.content.toString();

    let replyQueue = msg.properties.replyTo;

    console.log('Receive message : ' + info);
    console.log('Reply Queue is : ' + replyQueue);

    let model = JSON.parse(info);

    if (!model['type'] || !model['connId'] && !replyQueue) {
        return;
    }

    //判断连接是否存在

    //获取参数

    //返回APP参数
    thiz.replyToQueue(replyQueue, {appId: 1, domain: 'domain', password: 'pwd'})
}
