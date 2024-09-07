import prisma from '../prisma/prismaClient';
import { Router, Request, Response } from 'express';
import { buildFloEntityFilters } from '../utils/filterUtils';
import { parsePagination } from '../utils/paginationUtils';
import { queryParamValidator } from '../middleware/queryParamValidator';
import { fetchEntitiesRoute } from '../constants/routeConstants';

const router = Router();

// validation middleware
router.use(fetchEntitiesRoute, queryParamValidator);

// GET route to search for FLO entities
router.get(fetchEntitiesRoute, async (req: Request, res: Response, next) => {
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

export default router;
