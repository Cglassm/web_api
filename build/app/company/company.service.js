"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeEmployeeFromCompany = exports.addEmployeeToCompany = exports.deleteCompany = exports.getCompany = exports.getCompanies = exports.createCompany = void 0;
const errors_1 = require("../../error/errors");
const company_entity_1 = require("./entities/company.entity");
let currentId = 0;
const companies = new Map();
const createCompany = (company) => {
    currentId++;
    const companyEntity = new company_entity_1.Company(currentId, company.name, company.website, company.additionalNotes);
    companies.set(currentId, companyEntity);
    return {
        id: companyEntity.id,
        name: companyEntity.name,
        website: companyEntity.website,
        additionalNotes: companyEntity.additionalNotes,
        employees: []
    };
};
exports.createCompany = createCompany;
const getCompanies = () => {
    const result = [];
    companies.forEach(c => {
        const companyDto = {
            id: c.id,
            name: c.name,
            website: c.website,
            additionalNotes: c.additionalNotes,
            employees: []
        };
        c.employees.forEach(e => {
            companyDto.employees.push({
                id: e.id,
                firstName: e.firstName,
                lastName: e.lastName,
                email: e.email,
                phoneNumber: e.phoneNumber
            });
        });
        result.push(companyDto);
    });
    return result;
};
exports.getCompanies = getCompanies;
const getCompany = (id) => {
    const company = companies.get(id);
    if (!company) {
        throw new errors_1.NotFoundError(`Company with id ${id} not found`);
    }
    const result = {
        id: company.id,
        name: company.name,
        website: company.website,
        additionalNotes: company.additionalNotes,
        employees: []
    };
    company.employees.forEach(e => {
        result.employees.push({
            id: e.id,
            firstName: e.firstName,
            lastName: e.lastName,
            email: e.email,
            phoneNumber: e.phoneNumber,
        });
    });
    return result;
};
exports.getCompany = getCompany;
const deleteCompany = (id) => {
    const company = companies.get(id);
    if (!company) {
        throw new errors_1.NotFoundError(`Company with id ${id} not found`);
    }
    if (company.employees.length > 0) {
        throw new errors_1.UnauthorizedError("Cannot delete company with id ${id}. The company has employees. Remove them first.");
    }
    companies.delete(id);
};
exports.deleteCompany = deleteCompany;
const addEmployeeToCompany = (companyId, employee) => {
    const company = companies.get(companyId);
    if (!company) {
        throw new errors_1.NotFoundError(`Company with id ${companyId} not found`);
    }
    if (company.employees.length >= 3) {
        throw new errors_1.ValidationError("Cannot add employee to company with id ${companyId}", ["The company has too many employees. Remove some of them first."]);
    }
    company.employees.push(employee);
};
exports.addEmployeeToCompany = addEmployeeToCompany;
const removeEmployeeFromCompany = (companyId, employeeId) => {
    const company = companies.get(companyId);
    if (!company) {
        throw new errors_1.NotFoundError(`Company with id ${companyId} not found`);
    }
    const employee = company.employees.findIndex(e => e.id === employeeId);
    company.employees.splice(employee, 1);
};
exports.removeEmployeeFromCompany = removeEmployeeFromCompany;
