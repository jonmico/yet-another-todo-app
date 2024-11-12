import { Router } from 'express';
import { register } from '../controllers/user/register';
import { login } from '../controllers/user/login';

export const userRouter = Router();

userRouter.post('/register', register);
userRouter.post('/login', login);
