import { AppDataSource } from '../config/data-source';
import { User } from '../entity';

const getUser = async (username: string, email?: string) => {
    const authRepository = AppDataSource.getRepository(User);
    return await authRepository.findOne({
        where: [{username}, {email}],
    });
};

const createUser = async (username: string, password: string, email: string) => {
    const authRepository = AppDataSource.getRepository(User);
    const newUser = authRepository.create({ username, password, email });
    await authRepository.save(newUser);
    return newUser;
};

export {
    createUser,
    getUser,
};
