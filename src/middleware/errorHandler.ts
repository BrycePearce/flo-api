import { Request, Response, NextFunction } from 'express';
import { InvalidQueryParamsError, NotFoundError } from '../types/Errors';

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
    if (res.headersSent) {
        return next(err);
    }

    if (err instanceof InvalidQueryParamsError) {
        return res.status(err.status).json({
            error: err.message,
            details: err.details,
        });
    }

    if (err instanceof NotFoundError) {
        return res.status(err.status).json({
            error: err.message,
        });
    }

    return res.status(500).json({
        error: 'An unexpected error occurred',
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
    });
}