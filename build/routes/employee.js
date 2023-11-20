"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const employee_controller_1 = require("../controllers/employee.controller");
const router = express_1.default.Router();
router.get('/', employee_controller_1.getAllEmployees);
router.post('/', employee_controller_1.create);
router.delete('/:id', employee_controller_1.removeEmployee);
router.get('/:id', employee_controller_1.getEmployeeById);
exports.default = router;
