import { EmployeeDto } from "./employee.dto";

export interface GetEmployeeDto extends EmployeeDto {
    id: number;
}