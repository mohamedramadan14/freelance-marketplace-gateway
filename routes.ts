import { healthRoute } from '@gateway/routes/health';
import { Application } from 'express';

export const appRoutes = (app: Application): void => {
  app.use('', healthRoute.routes());
};
