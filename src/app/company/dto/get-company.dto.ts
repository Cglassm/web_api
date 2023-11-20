import { GetEmployeeDto } from "../../employee/dto/get-employee.dto";
import { CompanyDto } from "./company.dto";

export interface GetCompanyDto extends CompanyDto {
    id: number;
    employees: GetEmployeeDto[];
}