import jwt from 'jsonwebtoken';
import { secret_key } from '../utils/utils';
import bcrypt from 'bcrypt';
import { createUser, getUser } from '../repository/authRepository';

const login = async (req: any, res: any) => {
    const {username, password} = req.body;
    if (!username || !password) {
        return res.status(400).json({error: 'username and password is required'});
    }
    try {
        const user = await getUser(username);
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const token = jwt.sign({id: user.user_id, username: user.username }, secret_key, {expiresIn: '1h'});
        res.status(201).json({token});
    } catch (err) {
        console.error('Error executing query', err);
        res.status(500).send('Internal server error');
    }
};

const signup = async (req: any, res: any) => {
    const {username, password, email} = req.body;
    if (!username || !password || !email) {
        return res.status(400).json({error: 'username, password and email is required'});
    }
    try {
        const existingUser = await getUser(username, email);
        if (existingUser) {
            return res.status(409).json({error: 'Username or email already exists'});
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await createUser(username, hashedPassword, email);
        const token = jwt.sign({user_id: newUser.user_id, username: newUser.username}, secret_key, {expiresIn: '1h'});
        res.status(201).json({token});
    } catch (err) {
        console.error('Error executing query', err);
        res.status(500).send('Internal server error');
    }
};

export {
    login,
    signup,
}