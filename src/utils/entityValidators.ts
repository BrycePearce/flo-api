import { z } from 'zod';

// schema for query params
export const floEntityQuerySchema = z.object({
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
        .transform((val) => (val !== undefined ? parseInt(val, 10) : 25)) // Convert to number so we can refine the error message around it being an integer
        .refine((val) => val > 0, { message: "Limit must be a positive number" }),
    offset: z
        .string()
        .optional()
        .transform((val) => (val !== undefined ? parseInt(val, 10) : 0)) // Convert to number so we can refine the error message around it being an integer
        .refine((val) => val >= 0, { message: "Offset must be a non-negative number" }),
});