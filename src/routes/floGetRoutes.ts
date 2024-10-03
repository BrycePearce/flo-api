import prisma from '../prisma/prismaClient';
import { Router, Request, Response } from 'express';
import { buildFloEntityFilters } from '../utils/filterUtils';
import { parsePagination } from '../utils/paginationUtils';
import { fetchEntitiesValidator, fetchEntityValidator } from '../middleware/queryParamValidator';
import { fetchEntitiesRoute } from '../constants/routeConstants';
import { NotFoundError } from '../types/Errors';

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

export default router;
