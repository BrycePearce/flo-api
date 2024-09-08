import { createLogger, format } from 'winston';
import LokiTransport from 'winston-loki';
import { Request, Response, NextFunction } from 'express';

if (!process.env.LOKI_PASSWORD || !process.env.LOKI_USERNAME || !process.env.LOKI_HOST || process.env.LOKI_JOB || process.env.LOKI_APP) {
    throw new Error('Missing required loki environment variables');
}

const logger = createLogger({
    level: 'info',
    format: format.combine(
        format.timestamp(),
        format.json()
    ),
    transports: [
        new LokiTransport({
            host: process.env.LOKI_HOST,
            basicAuth: `${process.env.LOKI_USERNAME}:${process.env.LOKI_PASSWORD}`,
            labels: {
                job: process.env.LOKI_JOB,
                app: process.env.LOKI_APP,
                service: process.env.LOKI_SERVICE,
            },
            interval: 15,
            batching: true,
        })
    ]
});

// Middleware
const logHttpRequests = (req: Request, res: Response, next: NextFunction) => {
    res.on('finish', () => {
        logger.info({
            message: 'Request completed',
            route: req.originalUrl,
            method: req.method,
            statusCode: res.statusCode,
            ip: req.ip,
        });
    });
    next();
};

export default logHttpRequests;
