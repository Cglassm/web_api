import { Request,Response,  NextFunction } from "express";
import { handleHttpError } from "../error/error.handler";

const jwt = require('jsonwebtoken');

module.exports = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).send({
            title: 'Not authorized',
            code: 401,
        });
    }
    try {
        jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch (e: any) {
        return handleHttpError(res, e);
    }
}