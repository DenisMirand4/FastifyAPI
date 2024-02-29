import { FastifyReply, FastifyRequest } from "fastify";
import jwt from 'jsonwebtoken';

declare module "fastify" {
    interface FastifyRequest {
        user: any;
    }
}

export function authenticateToken(req: FastifyRequest, res: FastifyReply, next: () => void) {
    if(req.url === '/users/login' || req.url === '/users/register') return next();
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.status(401).send('Unauthorized');
    jwt.verify(token, process.env.JWT_SECRET as string, (err: any, user: any) => {
        if (err) return res.status(403).send('Forbidden');
        req.user = user;
        next();
    });
}

export default authenticateToken;
