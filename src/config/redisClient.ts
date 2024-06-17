import Redis from 'ioredis';

const redis = new Redis({
    port: 6379,
    host: 'localhost',
});

export default redis;