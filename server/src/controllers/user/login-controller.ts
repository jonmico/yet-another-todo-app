import bcrypt from 'bcrypt';
import { NextFunction, Request, Response } from 'express';
import z from 'zod';
import { db } from '../../db/db';
import { signAccessToken } from '../../utils/sign-access-token';
import { signRefreshToken } from '../../utils/sign-refresh-token';

const LoginSchema = z.object({
  email: z.string(),
  password: z.string(),
});

export async function loginController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    // handle this error
    const { email, password } = LoginSchema.parse(req.body);

    // handle this error
    const user = await db.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      res.status(400).json({ error: 'There is no user with that email.' });
      return;
    }

    // hash/compare the plain text password
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      res.status(403).json({ error: 'Invalid email or password.' });
      return;
    }
    // issue access/refresh tokens

    const accessToken = signAccessToken({
      id: user.id,
      createdAt: user.createdAt,
    });

    const refreshToken = signRefreshToken({
      id: user.id,
      tokenVersion: user.refreshTokenVersion,
    });
    // send response back saying user is logged in
    res.json({ user: { userId: user.id, accessToken, refreshToken } });
    return;
  } catch (err) {
    next(err);
  }
}
