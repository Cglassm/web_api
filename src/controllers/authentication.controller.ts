import { Request, Response } from "express";
import { createToken } from "../app/authentication/authentication.service";
import { handleHttpError } from "../error/error.handler";

const login = (req: Request, res: Response) => {
    try {
        const result = createToken(req.body);
        res.status(200).send(result);
    } catch (e: any) {
        handleHttpError(res, e);
    }
}

export { login }