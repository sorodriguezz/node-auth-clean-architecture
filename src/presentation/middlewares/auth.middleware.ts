import {NextFunction, Request, Response} from "express";

export class AuthMiddleware {
    static validateJWT = (req: Request, res: Response, next: NextFunction) => {
        const authorization = req.header('authorization') || '';

        if (!authorization) res.status(401).send({ error: 'Not authorized'});
        if (!authorization.startsWith('Bearer ')) res.status(401).send({ error: 'Invalid token'});

        const token = authorization.split(' ').at(1) || '';

        try {
            // const payload

            req.body.token = token;

            next();
        } catch (error) {
            console.error(error);
            res.status(500).send({error: 'Internal Server Error'});
        }
    }
}