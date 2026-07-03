import express from 'express';
import cors from 'cors';
import requestsRouter from './routes/requests.js';
import { errorHandler, notFound } from './middleware/errorHandler.js';

export function createApp(clientOrigin: string) {
  const app = express();

  app.use(cors({ origin: clientOrigin }));
  app.use(express.json());

  app.use('/api/requests', requestsRouter);

  app.use(notFound);
  app.use(errorHandler);

  return app;
}
