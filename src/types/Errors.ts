type ErrorDetail = {
    code: string;
    message: string;
    path: (string | number)[];
    keys?: string[];
}


export class InvalidQueryParamsError extends Error {
    public status: number;
    public details: ErrorDetail[];

    constructor(details: ErrorDetail[]) {
        super('Invalid query parameters');
        this.status = 400;
        this.details = details;
    }
}

export class NotFoundError extends Error {
    public status: number;

    constructor(resource: string) {
        super(`${resource} not found`);
        this.status = 404;
    }
}

export class UnauthorizedError extends Error {
    public status: number;

    constructor() {
        super('Unauthorized access');
        this.status = 401;
    }
}