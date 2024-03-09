import { Application } from 'express';
import { healthRoute } from '@gateway/routes/health';
import { authRoutes } from '@gateway/routes/auth';
import { currentUserRoutes } from '@gateway/routes/current-user';
import { authMiddleware } from '@gateway/services/auth-middleware';
import { searchRoutes } from '@gateway/routes/search';

const BASE_PATH = '/api/v1/gateway';

export const appRoutes = (app: Application): void => {
  app.use('', healthRoute.routes());
  app.use(BASE_PATH, authRoutes.routes());
  app.use(BASE_PATH, searchRoutes.routes());
  app.use(BASE_PATH, authMiddleware.verifyUser, currentUserRoutes.routes());
};
