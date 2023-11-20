//Thrown when a duplicate is detected.
export class ConflictError extends Error {
    constructor(message: string) {
        super(message)
    }
}

//Thrown when a resource is not found.
export class NotFoundError extends Error {
    constructor(message: string) {
        super(message)
    }
}

//Thrown when a request is not authorized.
export class UnauthorizedError extends Error {
    constructor(message: string) {
        super(message)
    }
}

//Thrown when model validation fails.
export class ValidationError extends Error {
    detail: string;
    errors: string[];
    
    constructor(detail: string, errors: string[], message: string = 'One or more validation errors occurred', ) {
        super(message)
        this.detail = detail;
        this.errors = errors;
    }
}

