import { AppDataSource } from '../config/data-source';
import redis from '../config/redisClient';
import { User } from '../entity';
import { TIME_TO_LIVE } from '../utils/utils';

const getUser = async (username: string, email?: string) => {
    const cachedKey = `user:${username}`;
    const cachedUser = await redis.get(cachedKey);
    if (cachedUser) {
        return JSON.parse(cachedUser);
    }
    const authRepository = AppDataSource.getRepository(User);
    const user = await authRepository.findOne({
        where: [{username}, {email}],
    });
    if (user) {
        await redis.set(cachedKey, JSON.stringify(user), 'EX', TIME_TO_LIVE);
    }
    return user;
};

const createUser = async (username: string, password: string, email: string) => {
    const authRepository = AppDataSource.getRepository(User);
    const newUser = authRepository.create({ username, password, email });
    await authRepository.save(newUser);
    const cachedKey = `user:${username}`;
    await redis.set(cachedKey, JSON.stringify(newUser), 'EX', TIME_TO_LIVE);
    return newUser;
};

export {
    createUser,
    getUser,
};
