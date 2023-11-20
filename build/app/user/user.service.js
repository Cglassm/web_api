"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkUser = void 0;
const user_entity_1 = require("./entities/user.entity");
const users = [
    new user_entity_1.User(1, 'user', 'user'),
];
const checkUser = (username, password) => {
    return users.find(u => u.username === username && u.password === password);
};
exports.checkUser = checkUser;
