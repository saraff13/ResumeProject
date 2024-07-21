import Redis from 'ioredis';

const redis = new Redis({
    port: Number(process.env.REDIS_PORT) || 6379,
    host: process.env.REDIS_HOST,
});

export default redis;