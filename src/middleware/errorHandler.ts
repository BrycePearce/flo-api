import { Request, Response, NextFunction } from 'express';
import { isApiError } from '../utils/typeGuards';
import type { ErrorDetail } from '../types/Errors';

export function errorHandler(
    err: unknown,
    _req: Request,
    res: Response,
    next: NextFunction
) {
    if (res.headersSent) {
        return next(err);
    }

    if (isApiError(err)) {
        const responseBody: {
            status: number;
            code: string;
            message: string;
            details?: ErrorDetail[];
        } = {
            status: err.status,
            code: err.code,
            message: err.message,
        };

        if (err.details) {
            responseBody.details = err.details;
        }

        return res.status(err.status).json(responseBody);
    }

    // unexpected errors
    const statusCode = 500;
    const responseBody = {
        status: statusCode,
        code: 'INTERNAL_SERVER_ERROR',
        message: 'An unexpected error occurred',
        stack:
            process.env.NODE_ENV === 'development' && err instanceof Error
                ? err.stack
                : undefined,
    };

    return res.status(statusCode).json(responseBody);
}