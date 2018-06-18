const redis = require('redis')
const redlock = require('redlock')

const redisConfig =require('./../configure/redis')


const redisClient = redis.createClient(redisConfig.port,redisConfig.host)

module.exports = new redlock([redisClient])