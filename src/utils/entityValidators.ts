import { z } from 'zod';
import { FLO_REQUEST_LIMIT, MAX_FLO_ID, MIN_FLO_ID } from '../constants/limits';

export const floEntityQuerySchema = z.strictObject({
    cert_status: z
        .string()
        .optional()
        .transform((val) => (val ? val.trim() : val)),
    lic_status: z
        .string()
        .optional()
        .transform((val) => (val ? val.trim() : val)),
    op_isCertified: z.enum(['true', 'false']).optional(),
    op_country: z
        .string()
        .optional()
        .transform((val) => (val ? val.trim() : val)),
    op_region: z
        .string()
        .optional()
        .transform((val) => (val ? val.trim() : val)),
    op_name: z
        .string()
        .optional()
        .transform((val) => (val ? val.trim() : val)),
    limit: z
        .string()
        .optional()
        .transform((val) => (val !== undefined ? parseInt(val, 10) : 25))
        .refine(
            (val) => val > 0 && val <= FLO_REQUEST_LIMIT,
            { message: `Limit must be a positive number less than or equal to ${FLO_REQUEST_LIMIT}` }
        ),
    offset: z
        .string()
        .optional()
        .transform((val) => (val !== undefined ? parseInt(val, 10) : 0))
        .refine((val) => val >= 0, { message: "Offset must be a non-negative number" }),
});


export const floIdQuerySchema = z.strictObject({
    floId: z
        .string()
        .regex(/^\d+$/, { message: 'floId must be a positive integer' })
        .refine((floIdStr) => {
            // Check if the floid is within the valid range
            if (floIdStr.length > 10) return false; // More than 10 digits is too large
            const parsedFloId = Number(floIdStr);
            return parsedFloId >= MIN_FLO_ID && parsedFloId <= MAX_FLO_ID;
        }, { message: `floId must be between ${MIN_FLO_ID} and ${MAX_FLO_ID}` }),
});