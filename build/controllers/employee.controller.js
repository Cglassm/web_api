"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeEmployee = exports.getAllEmployees = exports.getEmployeeById = exports.create = void 0;
const employee_service_1 = require("../app/employee/employee.service");
const error_handler_1 = require("../error/error.handler");
const create = (req, res) => {
    try {
        const result = (0, employee_service_1.createEmployee)(req.body);
        res.status(201).send(result);
    }
    catch (e) {
        (0, error_handler_1.handleHttpError)(res, e);
    }
};
exports.create = create;
const getEmployeeById = ({ params }, res) => {
    try {
        const { id } = params;
        const result = (0, employee_service_1.getEmployee)(parseInt(id));
        res.status(200).send(result);
    }
    catch (e) {
        (0, error_handler_1.handleHttpError)(res, e);
    }
};
exports.getEmployeeById = getEmployeeById;
const getAllEmployees = (req, res) => {
    try {
        const firstName = String(req.query.firstName || '');
        const lastName = String(req.query.lastName || '');
        if (firstName || lastName) {
            const result = (0, employee_service_1.filterEmployeesByFirstNameAndLastName)(firstName, lastName);
            res.status(200).send(result);
            return;
        }
        const result = (0, employee_service_1.getEmployees)();
        res.status(200).send(result);
    }
    catch (e) {
        (0, error_handler_1.handleHttpError)(res, e);
    }
};
exports.getAllEmployees = getAllEmployees;
const removeEmployee = ({ params }, res) => {
    try {
        const { id } = params;
        (0, employee_service_1.deleteEmployee)(parseInt(id));
        // 204 No Content
        res.status(204).send();
    }
    catch (e) {
        (0, error_handler_1.handleHttpError)(res, e);
    }
};
exports.removeEmployee = removeEmployee;
