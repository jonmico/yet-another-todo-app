import { NextFunction, Router, Request, Response } from 'express';
import { checkSessionController } from '../controllers/user/check-session-controller';
import { loginController } from '../controllers/user/login-controller';
import { registerController } from '../controllers/user/register-controller';
import { verifyTokens } from '../middleware/verify-tokens';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET as string;

export const userRouter = Router();

userRouter.post('/register', registerController);
userRouter.post('/login', loginController);
userRouter.post('/checkSession', verifyTokens, checkSessionController);
userRouter.post(
  '/cookieTest',
  (req: Request, res: Response, next: NextFunction) => {
    const { token } = req.body;

    const verifiedToken = jwt.verify(token, JWT_SECRET);

    res.json({ verifiedToken });
  }
);
