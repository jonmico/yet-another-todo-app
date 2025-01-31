import { Router } from 'express';
import { loginController } from '../controllers/user/login-controller';
import { registerController } from '../controllers/user/register-controller';

export const userRouter = Router();

userRouter.post('/register', registerController);
userRouter.post('/login', loginController);
