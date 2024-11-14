import { Router } from 'express';
import { register } from '../controllers/user/register-controller';
import { login } from '../controllers/user/login-controller';

export const userRouter = Router();

userRouter.post('/register', register);
userRouter.post('/login', login);
