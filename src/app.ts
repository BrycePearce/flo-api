import { PrismaClient } from '@prisma/client';
import express from 'express';
import floUpdateRoutes from './routes/floUpdateRoutes';

const app = express();
const prisma = new PrismaClient();
const port = process.env.PORT || 3000;
const routePrefix = "/api/v1/flo";

app.use(express.json());

// routes
app.use(routePrefix, floUpdateRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
