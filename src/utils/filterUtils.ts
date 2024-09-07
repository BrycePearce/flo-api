import type { FLOQueryParams } from "../types/FloQueryParams";
import type { Prisma } from "@prisma/client";

export function buildFloEntityFilters(query: FLOQueryParams) {
    const filters: Prisma.FLOEntityWhereInput = {};

    if (query.cert_status) filters.cert_status = query.cert_status;
    if (query.lic_status) filters.lic_status = query.lic_status;
    if (query.op_isCertified) filters.op_isCertified = query.op_isCertified === 'true';
    if (query.op_country) filters.op_country = query.op_country;
    if (query.op_region) filters.op_region = query.op_region;
    if (query.op_name) filters.op_name = { contains: query.op_name, mode: 'insensitive' };

    return filters;
}