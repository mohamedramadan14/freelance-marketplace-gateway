import { authService } from '@gateway/services/api/auth.service';
import { AxiosResponse } from 'axios';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export class VerifyEmail {
  public static async update(req: Request, res: Response): Promise<void> {
    console.log('FROM update()');

    const response: AxiosResponse = await authService.verifyEmail(req.body?.token);
    res.status(StatusCodes.OK).json({ message: response.data.message, user: response.data.user });
  }
}
