import express from 'express';
import floUpdateRoutes from './routes/floUpdateRoutes';
import floGetRoutes from './routes/floGetRoutes';
import { errorHandler } from './middleware/errorHandler';

const app = express();
const port = process.env.PORT || 3000;
const routePrefix = "/api/v1/flo";

app.use(express.json());

// routes
app.use(routePrefix, [floGetRoutes, floUpdateRoutes]);

// error handling middleware
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
