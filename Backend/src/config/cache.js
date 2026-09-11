const Redis = require("ioredis");

const redis = new Redis(process.env.REDIS_URL);
redis.on("connect", ()=>{
    console.log("database connected to redis")

})
module.exports = redis


