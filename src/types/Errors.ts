export type ErrorDetail = {
    code: string;
    message: string;
    path: (string | number)[];
    keys?: string[];
}

export class ApiError extends Error {
    public status: number;
    public code: string;
    public details?: ErrorDetail[];

    constructor(status: number, code: string, message: string, details?: ErrorDetail[]) {
        super(message);
        this.name = 'ApiError';
        this.status = status;
        this.code = code;
        this.details = details;
    }
}
export class InvalidQueryParamsError extends ApiError {
    constructor(details: ErrorDetail[]) {
        super(400, 'INVALID_QUERY_PARAMETERS', 'Invalid query parameters', details);
    }
}

export class NotFoundError extends ApiError {
    constructor(resource: string, details?: ErrorDetail[]) {
        super(404, 'NOT_FOUND', `${resource} not found`, details);
    }
}

export class UnauthorizedError extends ApiError {
    constructor() {
        super(401, 'UNAUTHORIZED', 'Unauthorized access');
    }
}