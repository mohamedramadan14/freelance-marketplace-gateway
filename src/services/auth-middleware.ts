import { config } from '@gateway/config';
import { BadRequestError, IAuthPayload, NotAuthorizedError } from '@mohamedramadan14/freelance-shared';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

class AuthMiddleware {
  public verifyUser(req: Request, _res: Response, next: NextFunction): void {
    if (!req.session?.jwt) {
      throw new NotAuthorizedError('Token is not available', 'Gateway Service - call: verifyUser()');
    }
    try {
      const payload: IAuthPayload = jwt.verify(req.session?.jwt, `${config.JWT_TOKEN}`) as IAuthPayload;
      req.currentUser = payload;
    } catch (error) {
      throw new NotAuthorizedError('Token is not valid', 'Gateway Service - call: verifyUser()');
    }
    next();
  }

  public checkAuth(req: Request, _res: Response, next: NextFunction): void {
    if (!req.currentUser) {
      throw new BadRequestError('User is not authenticated', 'Gateway Service - call: checkAuth()');
    }
    next();
  }
}

export const authMiddleware: AuthMiddleware = new AuthMiddleware();
