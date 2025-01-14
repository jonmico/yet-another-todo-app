import bcrypt from 'bcrypt';
import { NextFunction, Request, Response } from 'express';
import z from 'zod';
import { db } from '../../db/db';
import { signAccessToken } from '../../utils/sign-access-token';
import { signRefreshToken } from '../../utils/sign-refresh-token';
import { signToken } from '../../utils/sign-token';

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

    const token = signToken({
      id: user.id,
      createdAt: user.createdAt,
      email: user.email,
    });

    // send response back saying user is logged in
    res.json({ message: 'logged in.', user: { userId: user.id, token } });
    return;
  } catch (err) {
    next(err);
  }
}
