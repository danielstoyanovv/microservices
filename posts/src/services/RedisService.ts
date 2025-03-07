"use strict";

const redis = require('redis');
require('dotenv').config();

export class RedisService {
    /**
     * Create Redis Client
     * @return {object}
     */
    get createClient() {
        // Create Redis client
        const redisClient = redis.createClient({
            url: process.env.REDIS_URL || "redis://localhost:6379",
        });
        redisClient.on('error', (err: any) => console.error('Redis error:', err));
        redisClient.connect().then(() => console.log('Connected to Redis'));
        redisClient.set('visits', 0)

        return redisClient
    }
}