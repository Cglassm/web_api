import { NotFoundError } from "../../error/errors";
import { addEmployeeToCompany, removeEmployeeFromCompany } from "../company/company.service";
import { CreateEmployeeDto } from "./dto/create-employee.dto";
import { GetEmployeeDto } from "./dto/get-employee.dto";
import { Employee } from "./entities/employee.entity";

let currentId: number = 0;
const employees = new Map<number, Employee>();

const createEmployee = (employee: CreateEmployeeDto): GetEmployeeDto => {
    currentId++;
    const employeeEntity = new Employee(currentId, employee.firstName, employee.lastName, employee.email, employee.phoneNumber, employee.companyId);
    employees.set(currentId, employeeEntity);
    try {
        addEmployeeToCompany(employee.companyId, employeeEntity);
    } catch (e: any) {
        // If adding the employee to the company fails, we need to delete the employee from the employees map
        employees.delete(currentId);
        if (e instanceof NotFoundError) {
            throw new NotFoundError(`Company with id ${employee.companyId} not found`);
        }
    }

    return {
        id: employeeEntity.id,
        firstName: employeeEntity.firstName,
        lastName: employeeEntity.lastName,
        email: employeeEntity.email,
        phoneNumber: employeeEntity.phoneNumber,
    }
}

const getEmployee = (id: number): GetEmployeeDto => {
    const employee = employees.get(id);
    if (!employee) {
        throw new NotFoundError(`Employee with id ${id} not found`);
    }
    return {
        id: employee.id,
        firstName: employee.firstName,
        lastName: employee.lastName,
        email: employee.email,
        phoneNumber: employee.phoneNumber,
    }
}

const getEmployees = (): GetEmployeeDto[] => {
    const result: GetEmployeeDto[] = [];
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
}

const filterEmployeesByFirstNameAndLastName = (firstName: string | undefined, lastName: string | undefined) => {
    const result: GetEmployeeDto[] = [];
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
}

const deleteEmployee = (id: number) => {
    const employee = employees.get(id);
    if (!employee) {
        throw new NotFoundError(`Employee with id ${id} not found`);
    }
    // Remove the employee from the company
    removeEmployeeFromCompany(employee.companyId, id);
    employees.delete(id);
}



export {createEmployee, getEmployee, getEmployees, filterEmployeesByFirstNameAndLastName, deleteEmployee}