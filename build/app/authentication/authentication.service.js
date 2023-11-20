"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createToken = void 0;
const errors_1 = require("../../error/errors");
const user_service_1 = require("../user/user.service");
const jwt = require('jsonwebtoken');
const createToken = (loginDto) => {
    const user = (0, user_service_1.checkUser)(loginDto.username, loginDto.password);
    if (!user) {
        throw new errors_1.UnauthorizedError('Invalid username or password');
    }
    //We create and sign the token with the user id and the secret key
    const payload = { sub: user.id, username: user.username };
    const token = jwt.sign({ payload }, process.env.JWT_SECRET);
    return { token: token };
};
exports.createToken = createToken;
