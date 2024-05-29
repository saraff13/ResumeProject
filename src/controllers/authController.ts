import jwt from 'jsonwebtoken';
import { users } from "../models/user";
import { secret_key } from '../utils/utils';

const login = async (req: any, res: any) => {
    const {username, password} = req.body;
    if (!username || !password) {
        return res.status(400).json({error: 'username and password is required'});
    }
    try {
        const user = users.find((ele): any => ele.username === username && ele.password === password);
        if (user) {
            const token = jwt.sign({id: user.id, username: user.username}, secret_key, {expiresIn: '1h'});
            return res.status(201).json(token);
        } else {
            return res.status(404).json({error: 'Invalid credentials'});
        }
    } catch (err) {
        console.error('Error executing query', err);
        res.status(500).send('Error finding user in db');
    }
};

export {
    login
}