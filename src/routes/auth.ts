import { Password } from '@gateway/controllers/auth/password';
import { Seed } from '@gateway/controllers/auth/seed';
import { Signin } from '@gateway/controllers/auth/signin';
import { Signup } from '@gateway/controllers/auth/signup';
import { VerifyEmail } from '@gateway/controllers/auth/verify-email';
import express, { Router } from 'express';

class AuthRoutes {
  private router: Router;

  constructor() {
    this.router = express.Router();
  }

  public routes(): Router {
    this.router.post('/auth/signup', Signup.create);
    this.router.post('/auth/signin', Signin.read);
    this.router.put('/auth/verify-email', VerifyEmail.update);
    this.router.put('/auth/forgot-password', Password.forgotPassword);
    this.router.put('/auth/reset-password', Password.resetPassword);
    this.router.put('/auth/change-password', Password.changePassword);
    this.router.put('/auth/seed/:count', Seed.seedUsers);
    return this.router;
  }
}

export const authRoutes: AuthRoutes = new AuthRoutes();
