"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const company_1 = __importDefault(require("./routes/company"));
const employee_1 = __importDefault(require("./routes/employee"));
const authentication_1 = __importDefault(require("./routes/authentication"));
require('dotenv').config();
const authenticationMiddleware = require('./middleware/authentication.middleware');
const app = (0, express_1.default)();
app.use(express_1.default.json()); //middleware
const PORT = 3000;
// Companies
app.use('/api/companies', authenticationMiddleware, company_1.default);
// Employees
app.use('/api/employees', authenticationMiddleware, employee_1.default);
// Authentication
app.use('/api/authentication', authentication_1.default);
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
