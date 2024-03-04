import http from 'http';

import { config } from '@gateway/config';
import compression from 'compression';
import cookieSession from 'cookie-session';
import cors from 'cors';
import { winstonLogger, Level, CustomError, IErrorResponse } from '@mohamedramadan14/freelance-shared';
import { Application, NextFunction, Request, Response, json, urlencoded } from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import { StatusCodes } from 'http-status-codes';
import { Logger } from 'winston';
import { elasticsearch } from '@gateway/elasticsearch';
import { appRoutes } from 'routes';

const SERVER_PORT = 4000;
const logger: Logger = winstonLogger(`${config.ELASTICSEARCH_URL}`, 'API Gateway', Level.debug);

export class GatewayServer {
  private app: Application;
  constructor(app: Application) {
    this.app = app;
  }

  public start(): void {
    this.securityMiddleware(this.app);
    this.compressionEncodeMiddleware(this.app);
    this.routesMiddleware(this.app);
    this.startElasticsearch();
    this.errorHandler(this.app);
    this.startServer(this.app);
  }

  private securityMiddleware(app: Application): void {
    // TODO: Implement security middleware
    app.set('trust proxy', true);
    app.use(
      cookieSession({
        name: 'session',
        keys: [`${config.SECRET_KEY_ONE}`, `${config.SECRET_KEY_TWO}`],
        maxAge: 24 * 60 * 60 * 1000 * 7,
        secure: config.NODE_ENV !== 'development' // false: development to access session only ---> true: production
        //sameSite: 'none'
      })
    );
    app.use(hpp());
    app.use(helmet());
    app.use(
      cors({
        origin: '', // TODO: Change this to config.CLIENT_URL
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
      })
    );
  }

  private compressionEncodeMiddleware(app: Application): void {
    app.use(compression());
    app.use(json({ limit: '100mb' }));
    app.use(urlencoded({ extended: true, limit: '100mb' }));
  }

  private routesMiddleware(app: Application): void {
    appRoutes(app);
  }

  private startElasticsearch(): void {
    elasticsearch.createConnection();
  }

  private errorHandler(app: Application): void {
    app.use('*', (req: Request, res: Response, next: NextFunction) => {
      const fullUrl = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
      logger.log('error', `${fullUrl} - endpoint doesn't exist`);
      res.status(StatusCodes.NOT_FOUND).json({
        message: 'endpoint does not exist.'
      });
      next();
    });

    // Custom errors
    app.use('*', (error: IErrorResponse, _req: Request, res: Response, next: NextFunction) => {
      logger.log('error', `Gateway Service - ${error.comingFrom}`, error);
      if (error instanceof CustomError) {
        res.status(error.statusCode).json(error.serializedErrors());
      }
      next();
    });
  }

  private async startServer(app: Application): Promise<void> {
    try {
      const httpServer: http.Server = new http.Server(app);
      await this.startHttpServer(httpServer);
    } catch (error) {
      logger.log('error', 'Gateway Service - call: startServer()', error);
    }
  }

  private async startHttpServer(httpServer: http.Server): Promise<void> {
    try {
      logger.info(`Gateway service has started with PID ${process.pid}`);
      httpServer.listen(SERVER_PORT, () => {
        logger.info(`Gateway service is listening on port ${SERVER_PORT}`);
      });
    } catch (error) {
      logger.log('error', 'Gateway Service - call: startServer()', error);
    }
  }
}
