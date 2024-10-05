const { Redis } = require('ioredis');
require('dotenv').config();

const redisClient = () => {
  if (process.env.REDIS_URL) {
    console.log(`Redis Connected`);
    return process.env.REDIS_URL;
  }
  throw new Error('Redis Connection Failed');
};
let redis;
try {
  redis = new Redis(redisClient());
} catch (error) {
  console.log(error);
}

module.exports = { redis };
