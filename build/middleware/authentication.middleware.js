"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const error_handler_1 = require("../error/error.handler");
const jwt = require('jsonwebtoken');
module.exports = (req, res, next) => {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    if (!token) {
        return res.status(401).send({
            title: 'Not authorized',
            code: 401,
        });
    }
    try {
        jwt.verify(token, process.env.JWT_SECRET_KEY);
        next();
    }
    catch (e) {
        return (0, error_handler_1.handleHttpError)(res, e);
    }
};
