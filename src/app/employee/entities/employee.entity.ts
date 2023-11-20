export class Employee {
    id: number;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    companyId: number;

    constructor(id: number, firstName: string, lastName: string, phoneNumber: string, email: string, companyId: number) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.companyId = companyId;
    }
}