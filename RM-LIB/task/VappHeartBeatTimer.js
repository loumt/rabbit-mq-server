"use strict";

const nodeSchedule = require('node-schedule')
const RMTunnelConnection  = require('./../RMTunnelConnection')
const locker  = require('./../../locker')

nodeSchedule.scheduleJob('*/5 * * * * *',()=>{
    // console.log(new Date());
    locker.lock('cloud-app',3000).then(lock=>{
        RMTunnelConnection.getInstanceConnection().then(connect=>{

        }).catch(e=>{
            console.log(e);
        })

        setTimeout(()=>{
            lock.unlock()
        },5000)
    }).catch(e=>{
        console.log('lock error!')
    })
})

