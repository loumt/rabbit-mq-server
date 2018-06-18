
const nodeSchedule = require('node-schedule')
var client = require('redis').createClient('6379','192.168.16.66');
const RedLock = require('redlock');

const redlock = new RedLock(client);

setTimeout(()=>{
    redlock.lock('redis.lock.example',1000).then((lock)=>{

        let num = 0;

        for(let i=0;i<8;i++){
            console.log(num ++ )
            if(num == 8) {
                lock.unlock()
                return
            }
        }

    }).catch(e=>{
        console.log(e);
    })
},5000)


redlock.lock('redis.lock.example',1000).then((lock)=>{
    let num = 0
    for(let i=0;i<8;i++){
        console.log(num ++ );
        if(num == 8) {
            lock.unlock()
            return
        }
    }

}).catch(e=>{
    console.log(e);
})


nodeSchedule.scheduleJob('*/5 * * * * *',function(){
    console.log(new Date());
})