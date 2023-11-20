import { EmployeeDto } from "./employee.dto";

export interface CreateEmployeeDto extends EmployeeDto {
    companyId: number;
}
