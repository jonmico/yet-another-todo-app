import { Router } from 'express';
import { checkSessionController } from '../controllers/user/check-session-controller';
import { loginController } from '../controllers/user/login-controller';
import { registerController } from '../controllers/user/register-controller';
import { verifyTokens } from '../middleware/verify-tokens';

export const userRouter = Router();

userRouter.post('/register', registerController);
userRouter.post('/login', loginController);
userRouter.get('/checkSession', verifyTokens, checkSessionController);
