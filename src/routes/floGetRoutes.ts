import prisma from '../prisma/prismaClient';
import { Router, Request, Response } from 'express';
import { buildFloEntityFilters } from '../utils/filterUtils';
import { floEntityQuerySchema } from '../utils/entityValidators';
import { parsePagination } from '../utils/paginationUtils';

const router = Router();

// GET route to search for FLO entities
router.get('/entities', async (req: Request, res: Response) => {
    try {
        const parsedQuery = floEntityQuerySchema.safeParse(req.query);

        if (!parsedQuery.success) {
            return res.status(400).json({ error: 'Invalid query parameters', details: parsedQuery.error.errors });
        }

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
        console.error('Error fetching entities:', error);
        res.status(500).json({ error: 'Failed to fetch entities' });
    }
});

export default router;
