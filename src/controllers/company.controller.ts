import { Request, Response } from "express";
import { createCompany, deleteCompany, getCompanies, getCompany } from "../app/company/company.service";
import { handleHttpError } from "../error/error.handler";


const create = (req: Request, res: Response) => {
    try {
        const result = createCompany(req.body);
        res.status(200).send(result);
    } catch (error: any) {
        handleHttpError(res, error);
    }
}

const getAll = (req: Request, res: Response) => {
    try {
        const result = getCompanies();
        res.status(200).send(result);
    } catch (error: any) {
        handleHttpError(res, error);
    }
}

const getCompanyById = ({params}: Request, res: Response) => {
    try {
        //PREGUNTAR: Por que se pone asi 
        const { id } = params;
        const result = getCompany(parseInt(id));
        res.status(200).send(result);
    } catch (error: any) {
        handleHttpError(res, error);
    }
}

const deleteCompanyById = ({ params }: Request, res: Response) => {
    try {
        const { id } = params;
        deleteCompany(parseInt(id));
        res.status(200).send();
    } catch (error: any) {
        handleHttpError(res, error);
    }
}

export { create, getAll, getCompanyById, deleteCompanyById}