import { z } from 'zod';
import { FLO_REQUEST_LIMIT } from '../constants/limits';

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
