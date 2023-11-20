"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCompanyById = exports.getCompanyById = exports.getAll = exports.create = void 0;
const company_service_1 = require("../app/company/company.service");
const error_handler_1 = require("../error/error.handler");
const create = (req, res) => {
    try {
        const result = (0, company_service_1.createCompany)(req.body);
        res.status(200).send(result);
    }
    catch (error) {
        (0, error_handler_1.handleHttpError)(res, error);
    }
};
exports.create = create;
const getAll = (req, res) => {
    try {
        const result = (0, company_service_1.getCompanies)();
        res.status(200).send(result);
    }
    catch (error) {
        (0, error_handler_1.handleHttpError)(res, error);
    }
};
exports.getAll = getAll;
const getCompanyById = ({ params }, res) => {
    try {
        //PREGUNTAR: Por que se pone asi 
        const { id } = params;
        const result = (0, company_service_1.getCompany)(parseInt(id));
        res.status(200).send(result);
    }
    catch (error) {
        (0, error_handler_1.handleHttpError)(res, error);
    }
};
exports.getCompanyById = getCompanyById;
const deleteCompanyById = ({ params }, res) => {
    try {
        const { id } = params;
        (0, company_service_1.deleteCompany)(parseInt(id));
        res.status(200).send();
    }
    catch (error) {
        (0, error_handler_1.handleHttpError)(res, error);
    }
};
exports.deleteCompanyById = deleteCompanyById;
