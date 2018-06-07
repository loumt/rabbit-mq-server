"use strict";
const {server} = require('../configure/index')

class NormalCustomer{
    constructor(){
    }

    consume(msg){
        console.log(`${server.port} ==> ${msg.content.toString()}`);
    }

}

module.exports = new NormalCustomer();