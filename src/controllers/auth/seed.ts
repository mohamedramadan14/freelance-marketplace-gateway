import { authService } from '@gateway/services/api/auth.service';
import { AxiosResponse } from 'axios';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export class Seed {
  public static async seedUsers(req: Request, res: Response): Promise<void> {
    console.log('FROM seedUsers()');
    const response: AxiosResponse = await authService.seed(req.params.count);
    res.status(StatusCodes.OK).json({ message: response.data.message });
  }
}
