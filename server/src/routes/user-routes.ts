import { Router } from 'express';
import { registerController } from '../controllers/user/register-controller';
import { loginController } from '../controllers/user/login-controller';
import { checkSessionController } from '../controllers/user/check-session-controller';
import { verifyTokens } from '../middleware/verifyTokens';

export const userRouter = Router();

userRouter.post('/register', registerController);
userRouter.post('/login', loginController);
userRouter.get('/checkSession', verifyTokens, checkSessionController);
