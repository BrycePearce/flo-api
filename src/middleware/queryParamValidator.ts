import { floEntityQuerySchema, floIdQuerySchema } from "../utils/entityValidators";
import { NextFunction, Request, Response } from "express";
import { InvalidQueryParamsError } from "../types/Errors";

export const fetchEntitiesValidator = (req: Request, _res: Response, next: NextFunction) => {
    const parsedQuery = floEntityQuerySchema.safeParse(req.query);

    if (!parsedQuery.success) {
        const zodErrors = parsedQuery.error.errors.map((err) => ({
            code: err.code,
            message: err.message,
            path: err.path,
            ...(err.code === 'unrecognized_keys' ? { keys: err.keys } : {}),
        }));

        return next(new InvalidQueryParamsError(zodErrors));
    }

    // passes validation
    next();
};

export const fetchEntityValidator = (req: Request, _res: Response, next: NextFunction) => {
    const result = floIdQuerySchema.safeParse(req.params);

    if (!result.success) {
        const zodErrors = result.error.errors.map((err) => ({
            code: err.code,
            message: err.message,
            path: err.path,
            ...(err.code === 'unrecognized_keys' ? { keys: err.keys } : {}),
        }));

        return next(new InvalidQueryParamsError(zodErrors));
    }

    next();
}