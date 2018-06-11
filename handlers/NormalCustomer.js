"use strict";
const {server} = require('../configure/index')

class NormalCustomer{
    constructor(){
        this.names = [];
    }

    consume(msg){
        this.names.push(msg);
        console.log(`${server.port} ==> ${msg.content.toString()} | ${JSON.stringify(this.names)}`);
    }

}

module.exports = new NormalCustomer();