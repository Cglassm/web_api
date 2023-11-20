import { NotFoundError, ValidationError } from "../../error/errors";
import { Employee } from "../employee/entities/employee.entity";
import { GetCompanyDto } from "./dto/get-company.dto";
import { Company } from "./entities/company.entity";

let currentId = 0;
const companies = new Map<number, Company>();

const createCompany = (company: Company): GetCompanyDto => {
    currentId++;
    const companyEntity = new Company(currentId, company.name, company.website, company.additionalNotes);
    companies.set(currentId, companyEntity);
    return {
        id: companyEntity.id,
        name: companyEntity.name,
        website: companyEntity.website,
        additionalNotes: companyEntity.additionalNotes,
        employees: []
    }
}

const getCompanies = (): GetCompanyDto[] => {
    const result: GetCompanyDto[] = [];
    companies.forEach(company => {
        result.push({
            id: company.id,
            name: company.name,
            website: company.website,
            additionalNotes: company.additionalNotes,
            employees: []
        });
    });
    return result;
}

const getCompany = (id: number): GetCompanyDto => {
    const company = companies.get(id);
    if (!company) {
        throw new NotFoundError(`Company with id ${id} not found`);
    }
    const result: GetCompanyDto = {
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
}

const deleteCompany = (id: number) => {
    const company = companies.get(id);
    if (!company) {
        throw new NotFoundError(`Company with id ${id} not found`);
    }
    if (company.employees.length > 0) {
        throw new ValidationError("Cannot delete company with id ${id}",["The company has employees. Remove them first."]);
    }
    companies.delete(id);
}

const addEmployeeToCompany = (companyId: number, employee: Employee) => {
    const company = companies.get(companyId);
    if (!company) {
        throw new NotFoundError(`Company with id ${companyId} not found`);
    }
    company.employees.push(employee);
}

const removeEmployeeFromCompany = (companyId: number, employeeId: number) => {
    const company = companies.get(companyId);
    if (!company) {
        throw new NotFoundError(`Company with id ${companyId} not found`);
    }
    const employee = company.employees.findIndex(e => e.id === employeeId);
    company.employees.splice(employee, 1);
}

export {createCompany, getCompanies, getCompany, deleteCompany, addEmployeeToCompany, removeEmployeeFromCompany}