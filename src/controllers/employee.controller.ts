import { Request, Response } from "express";
import { createEmployee, deleteEmployee, filterEmployeesByFirstNameAndLastName, getEmployee, getEmployees } from "../app/employee/employee.service";
import { handleHttpError } from "../error/error.handler";

const create = (req: Request, res: Response) => {
    try {
        const result = createEmployee(req.body);
        res.status(201).send(result);
    } catch (e: any) {
        handleHttpError(res, e);
    }
}

const getEmployeeById = ({ params }: Request, res: Response) => {
    try {
        const { id } = params;
        const result = getEmployee(parseInt(id));
        res.status(200).send(result);
    } catch (e: any) {
        handleHttpError(res, e);
    }
}

const getAllEmployees = (req: Request, res: Response) => {
    try {
        const firstName: string = String(req.query.firstName || '');
        const lastName: string = String(req.query.lastName || '');
        if (firstName || lastName) {
            const result = filterEmployeesByFirstNameAndLastName(firstName, lastName);
            res.status(200).send(result);
            return;
        }
        const result = getEmployees();
        res.status(200).send(result);
    } catch (e: any) {
        handleHttpError(res, e);
    }
}

const removeEmployee = ({ params }: Request, res: Response) => {
    try {
        const { id } = params;
        deleteEmployee(parseInt(id));
        // 204 No Content
        res.status(204).send();
    } catch (e: any) {
        handleHttpError(res, e);
    }
}

export { create, getEmployeeById, getAllEmployees, removeEmployee}