import { Router } from 'express';
import { checkSessionController } from '../controllers/user/check-session-controller';
import { loginController } from '../controllers/user/login-controller';
import { registerController } from '../controllers/user/register-controller';

export const userRouter = Router();

userRouter.post('/register', registerController);
userRouter.post('/login', loginController);
userRouter.post('/checkSession', checkSessionController);
