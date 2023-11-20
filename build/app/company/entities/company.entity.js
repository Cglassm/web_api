"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Company = void 0;
class Company {
    constructor(id, name, website, additionalNotes) {
        this.id = id;
        this.name = name;
        this.website = website;
        this.additionalNotes = additionalNotes;
        this.employees = [];
    }
}
exports.Company = Company;
