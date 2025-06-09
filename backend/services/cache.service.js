const { redisClient } = require('../config/redis');

exports.get = async (key) => {
    const value = await redisClient.get(key);
    return value ? JSON.parse(value) : null;
};

exports.set = async (key, data, ttl = 3600) => {
    await redisClient.set(key, JSON.stringify(data), {
        EX: ttl
    });
};

exports.del = async (key) => {
    await redisClient.del(key);
};
