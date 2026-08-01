import rateLimit from "express-rate-limit";
import { RedisStore } from "rate-limit-redis";
import redisConnection from "../config/redis.js";

const createRedisStore = (prefix) =>
    new RedisStore({
        sendCommand: (...args) => redisConnection.call(...args),
        prefix,
    });

const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 5,

    standardHeaders: true,
    legacyHeaders: false,

    message: {
        success: false,
        message: "Too many requests. Please try again later.",
    },
});


const baseConfig = {
    windowMs: 15 * 60 * 1000, // 15 minutes

    standardHeaders: true,
    legacyHeaders: false,

    message: {
        success: false,
        message: "Too many requests. Please try again later.",
    },
};

export const readLimiter = rateLimit({
    ...baseConfig,
    store: createRedisStore("rl:read:"),
    limit: 3,
});

export const writeLimiter = rateLimit({
    ...baseConfig,
    store: createRedisStore("rl:write:"),
    limit: 60,
});

export const generalLimiter = rateLimit({
    ...baseConfig,
    store: createRedisStore("rl:general:"),
    limit: 100,
});

export const authLimiter = rateLimit({
    ...baseConfig,
    store: createRedisStore("rl:auth:"),
    limit: 20,
});

export default apiLimiter;
