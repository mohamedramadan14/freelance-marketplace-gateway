import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export class Health {
  public static health(_req: Request, res: Response) {
    res.status(StatusCodes.OK).send('Gateway Service - Healthy');
  }
}
