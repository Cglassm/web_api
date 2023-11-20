"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const authentication_service_1 = require("../app/authentication/authentication.service");
const error_handler_1 = require("../error/error.handler");
const login = (req, res) => {
    try {
        const result = (0, authentication_service_1.createToken)(req.body);
        res.status(200).send(result);
    }
    catch (e) {
        (0, error_handler_1.handleHttpError)(res, e);
    }
};
exports.login = login;
