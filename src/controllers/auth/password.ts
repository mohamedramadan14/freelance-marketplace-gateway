import { authService } from '@gateway/services/api/auth.service';
import { AxiosResponse } from 'axios';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export class Password {
  public static async forgotPassword(req: Request, res: Response): Promise<void> {
    console.log('FROM forgotPassword()');

    const response: AxiosResponse = await authService.forgotPassword(req.body.email);

    res.status(StatusCodes.OK).json({ message: response.data.message });
  }

  public static async resetPassword(req: Request, res: Response): Promise<void> {
    console.log('FROM resetPassword()');
    const { password, confirmPassword } = req.body;
    const response: AxiosResponse = await authService.resetPassword(req.params.token, password, confirmPassword);

    res.status(StatusCodes.OK).json({ message: response.data.message });
  }

  public static async changePassword(req: Request, res: Response): Promise<void> {
    console.log('FROM changePassword()');
    const { currentPassword, newPassword } = req.body;
    const response: AxiosResponse = await authService.changePassword(currentPassword, newPassword);

    res.status(StatusCodes.OK).json({ message: response.data.message });
  }
}
