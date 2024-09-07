import express from 'express';
import floGetRoutes from './routes/floGetRoutes';
import floUpdateRoutes from './routes/floUpdateRoutes';
import { errorHandler } from './middleware/errorHandler';
import { routePrefix } from './constants/routeConstants';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// routes
app.use(routePrefix, [floGetRoutes, floUpdateRoutes]);

// error handling middleware
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
