import { Router } from 'express';
import type { FLOEntity } from '@prisma/client';
import prisma from "../prisma/prismaClient";

const router = Router();

// accepts a list of floEntities and inserts them into the database
router.post('/insert-entities', async (req, res) => {
    const entities: FLOEntity[] = req.body as FLOEntity[];
    try {
        // upsert will update entities with differences, or insert them if they do not exist
        const upsertPromises = entities.map((entity: FLOEntity) =>
            prisma.fLOEntity.upsert({
                where: { op_floId: entity.op_floId },
                update: { ...entity },
                create: { ...entity }
            })
        );

        const results = await Promise.allSettled(upsertPromises);
        // Separate the successful and failed operations
        const { fulfilled: successful = [], rejected: failed = [] } = Object.groupBy(results, result => result.status);

        if (failed.length === 0) {
            res.status(201).json({
                message: 'All entities inserted/updated successfully',
                entities: successful
            });
        } else if (successful.length > 0) {
            res.status(207).json({
                message: 'Some entities inserted/updated successfully, but some failed',
                entities: successful,
                failedEntities: failed
            });
        } else {
            res.status(500).json({
                message: 'Failed to insert/update any entities',
                entities: [],
                failedEntities: failed
            });
        }
    } catch (error) {
        console.error('Unexpected error:', error);
        res.status(500).json({ error: 'Failed to process entities' });
    }
});


export default router;
