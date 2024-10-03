import { ApiError } from "../types/Errors";

export function isApiError(error: unknown): error is ApiError {
    return error instanceof ApiError;
}
