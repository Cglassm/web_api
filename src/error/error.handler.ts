import { Response } from "express";
import { ConflictError, NotFoundError, UnauthorizedError, ValidationError } from "./errors";


const handleHttpError = (res: Response, error: Error) => {
    if(error instanceof ValidationError) {
        res.status(400).send({
            title: error.message,
            detail: error.detail,
            code: 400,
            errors: error.errors
        });
    } else if(error instanceof NotFoundError) {
        res.status(404).send({
            title: 'Resource not found',
            code: 404,
        });
    } else if(error instanceof ConflictError) {
        res.status(409).send({
            title: 'Resource already exists',
            detail: error.message,
            code: 409
        });
    } else if(error instanceof UnauthorizedError) {
        res.status(401).send({
            title: 'Unauthorized',
            code: 401
        });
    } else {
        console.error(error);
        res.status(500).send('Unexpected error occurred');
    }
};

export { handleHttpError }