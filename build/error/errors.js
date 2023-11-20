"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationError = exports.UnauthorizedError = exports.NotFoundError = exports.ConflictError = void 0;
//Thrown when a duplicate is detected.
class ConflictError extends Error {
    constructor(message) {
        super(message);
    }
}
exports.ConflictError = ConflictError;
//Thrown when a resource is not found.
class NotFoundError extends Error {
    constructor(message) {
        super(message);
    }
}
exports.NotFoundError = NotFoundError;
//Thrown when a request is not authorized.
class UnauthorizedError extends Error {
    constructor(message) {
        super(message);
    }
}
exports.UnauthorizedError = UnauthorizedError;
//Thrown when model validation fails.
class ValidationError extends Error {
    constructor(detail, errors, message = 'One or more validation errors occurred') {
        super(message);
        this.detail = detail;
        this.errors = errors;
    }
}
exports.ValidationError = ValidationError;
