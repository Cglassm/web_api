import { Employee } from "../../employee/entities/employee.entity";

export class Company {
    id: number;
    name: string;
    website: string;
    additionalNotes: string;
    employees: Employee[];

    constructor(id:number, name: string, website: string, additionalNotes: string) {
        this.id = id;
        this.name = name;
        this.website = website;
        this.additionalNotes = additionalNotes;
        this.employees = [];
    }
}