import { NextFunction } from "express";
import jwt from "jsonwebtoken";
import { secret_key } from "../utils/utils";

const authenticateToken = (req: any, res: any, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({error: 'Unauthorized'});
    }
    jwt.verify(token, secret_key, (err: any, user: any) => {
        if (err) {
            return res.status(403).json({error: 'Forbidden'});
        }
        req.user = user;
        next();
    });
};

export {
    authenticateToken,
}