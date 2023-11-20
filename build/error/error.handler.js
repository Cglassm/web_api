"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleHttpError = void 0;
const errors_1 = require("./errors");
const handleHttpError = (res, error) => {
    if (error instanceof errors_1.ValidationError) {
        res.status(400).send({
            title: error.message,
            detail: error.detail,
            code: 400,
            errors: error.errors
        });
    }
    else if (error instanceof errors_1.NotFoundError) {
        res.status(404).send({
            title: 'Resource not found',
            code: 404,
        });
    }
    else if (error instanceof errors_1.ConflictError) {
        res.status(409).send({
            title: 'Resource already exists',
            detail: error.message,
            code: 409
        });
    }
    else if (error instanceof errors_1.UnauthorizedError) {
        res.status(401).send({
            title: 'Unauthorized',
            code: 401
        });
    }
    else {
        console.error(error);
        res.status(500).send('Unexpected error occurred');
    }
};
exports.handleHttpError = handleHttpError;
