import prisma from '../prisma/prismaClient';
import { NotFoundError } from '../types/Errors';
import { Router, Request, Response } from 'express';
import { buildFloEntityFilters } from '../utils/filterUtils';
import { fetchEntitiesRoute, fetchStatsRoute } from '../constants/routeConstants';
import { fetchEntitiesValidator, fetchEntityValidator } from '../middleware/queryParamValidator';
import { parsePagination } from '../utils/paginationUtils';
import { getTopCertificationStandards, getTopCertifiedProducts } from '../repositories/stats';

const router = Router();

// Find matching FLO entities
router.get(fetchEntitiesRoute, fetchEntitiesValidator, async (req: Request, res: Response, next) => {
    try {
        const { limit, offset } = req.query;
        const { limit: parsedLimit, offset: parsedOffset } = parsePagination(limit as string, offset as string);

        const filters = buildFloEntityFilters(req.query);

        // Fetch filtered data from the database with pagination
        const entities = await prisma.fLOEntity.findMany({
            where: filters,
            skip: parsedOffset, // Offset for pagination
            take: parsedLimit,  // Limit for pagination
            orderBy: { op_name: 'asc' } // todo: add customization here
        });

        // Count total number of results matching the filters (for pagination)
        const totalCount = await prisma.fLOEntity.count({ where: filters });

        // Respond with entities and pagination metadata
        res.status(200).json({
            entities,
            totalCount,
            limit: parsedLimit,
            offset: parsedOffset
        });
    } catch (error) {
        // bubble the error up
        next(error);
    }
});

// find a single entity
router.get(`${fetchEntitiesRoute}/:floId`, fetchEntityValidator, async (req: Request, res: Response, next) => {
    try {
        const floId = parseInt(req.params?.floId, 10);

        const entity = await prisma.fLOEntity.findUnique({
            where: { op_floId: floId },
        });

        if (entity) {
            res.status(200).json(entity);
        } else {
            next(new NotFoundError('FLO entity'));
        }
    } catch (error) {
        next(error);
    }
});

router.get(fetchStatsRoute, async (_req: Request, res: Response, next) => {
    try {
        // Total number of entities
        const totalEntities = await prisma.fLOEntity.count();

        // // Number of certified entities
        const certifiedEntities = await prisma.fLOEntity.count({
            where: { op_isCertified: true },
        });

        // // Entities by country
        const entitiesByCountry = await prisma.fLOEntity.groupBy({
            by: ['op_country'],
            _count: { op_floId: true },
            orderBy: { _count: { op_floId: 'desc' } },
        });

        // // Entities by region
        const entitiesByRegion = await prisma.fLOEntity.groupBy({
            by: ['op_region'],
            _count: { op_floId: true },
            orderBy: { _count: { op_floId: 'desc' } },
        });

        // // Entities by certification status
        const entitiesByCertStatus = await prisma.fLOEntity.groupBy({
            by: ['cert_status'],
            _count: { op_floId: true },
        });

        // Entities by license status
        const entitiesByLicStatus = await prisma.fLOEntity.groupBy({
            by: ['lic_status'],
            _count: { op_floId: true },
        });

        // Top certified products
        const topCertifiedProducts = await getTopCertifiedProducts();

        // Top certification standards
        const topCertificationStandards = await getTopCertificationStandards();

        // Recent additions in the last month
        const totalAdditionsInTheLastMonth = await prisma.fLOEntity.count({
            where: {
                createdAt: {
                    gte: new Date(new Date().setMonth(new Date().getMonth() - 1)),
                },
            },
        });

        res.status(200).json({
            totalEntities,
            certifiedEntities,
            entitiesByCountry,
            entitiesByRegion,
            entitiesByCertStatus,
            entitiesByLicStatus,
            topCertifiedProducts,
            topCertificationStandards,
            totalAdditionsInTheLastMonth,
        });
    } catch (error) {
        next(error);
    }
});

export default router;
