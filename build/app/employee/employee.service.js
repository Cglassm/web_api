"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteEmployee = exports.filterEmployeesByFirstNameAndLastName = exports.getEmployees = exports.getEmployee = exports.createEmployee = void 0;
const errors_1 = require("../../error/errors");
const company_service_1 = require("../company/company.service");
const employee_entity_1 = require("./entities/employee.entity");
let currentId = 0;
const employees = new Map();
const createEmployee = (employee) => {
    currentId++;
    const employeeEntity = new employee_entity_1.Employee(currentId, employee.firstName, employee.lastName, employee.email, employee.phoneNumber, employee.companyId);
    employees.set(currentId, employeeEntity);
    try {
        (0, company_service_1.addEmployeeToCompany)(employee.companyId, employeeEntity);
    }
    catch (e) {
        // If adding the employee to the company fails, we need to delete the employee from the employees map
        employees.delete(currentId);
        if (e instanceof errors_1.NotFoundError) {
            throw new errors_1.NotFoundError(`Company with id ${employee.companyId} not found`);
        }
    }
    return {
        id: employeeEntity.id,
        firstName: employeeEntity.firstName,
        lastName: employeeEntity.lastName,
        email: employeeEntity.email,
        phoneNumber: employeeEntity.phoneNumber,
    };
};
exports.createEmployee = createEmployee;
const getEmployee = (id) => {
    const employee = employees.get(id);
    if (!employee) {
        throw new errors_1.NotFoundError(`Employee with id ${id} not found`);
    }
    return {
        id: employee.id,
        firstName: employee.firstName,
        lastName: employee.lastName,
        email: employee.email,
        phoneNumber: employee.phoneNumber,
    };
};
exports.getEmployee = getEmployee;
const getEmployees = () => {
    const result = [];
    employees.forEach(employee => {
        result.push({
            id: employee.id,
            firstName: employee.firstName,
            lastName: employee.lastName,
            email: employee.email,
            phoneNumber: employee.phoneNumber,
        });
    });
    return result;
};
exports.getEmployees = getEmployees;
const filterEmployeesByFirstNameAndLastName = (firstName, lastName) => {
    const result = [];
    employees.forEach(employee => {
        if (firstName && lastName) {
            if (employee.firstName.toLowerCase() === firstName.toLowerCase() && employee.lastName.toLowerCase() === lastName.toLowerCase()) {
                result.push({
                    id: employee.id,
                    firstName: employee.firstName,
                    lastName: employee.lastName,
                    email: employee.email,
                    phoneNumber: employee.phoneNumber,
                });
            }
        }
    });
    return result;
};
exports.filterEmployeesByFirstNameAndLastName = filterEmployeesByFirstNameAndLastName;
const deleteEmployee = (id) => {
    const employee = employees.get(id);
    if (!employee) {
        throw new errors_1.NotFoundError(`Employee with id ${id} not found`);
    }
    // Remove the employee from the company
    (0, company_service_1.removeEmployeeFromCompany)(employee.companyId, id);
    employees.delete(id);
};
exports.deleteEmployee = deleteEmployee;
