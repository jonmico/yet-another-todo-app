import bcrypt from 'bcrypt';
import { NextFunction, Request, Response } from 'express';
import z from 'zod';
import { db } from '../../db/db';
import { signToken } from '../../utils/sign-token';

const LoginSchema = z.object({
  email: z.string(),
  password: z.string(),
});

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const result = LoginSchema.safeParse(req.body);

    if (!result.success) {
      const errors = result.error.flatten().fieldErrors;

      res.status(400).json({
        error: {
          email: errors.email?.join(', '),
          password: errors.password?.join(', '),
        },
      });
      return;
    }

    const user = await db.user.findUnique({
      where: {
        email: result.data.email,
      },
    });

    if (!user) {
      res
        .status(400)
        .json({ error: { _server: 'There is no user with that email.' } });
      return;
    }

    const isValidPassword = await bcrypt.compare(
      result.data.password,
      user.password
    );

    if (!isValidPassword) {
      res
        .status(403)
        .json({ error: { _server: 'Invalid email or password.' } });
      return;
    }

    const token = signToken({
      id: user.id,
      createdAt: user.createdAt,
      email: user.email,
    });

    res.json({ message: 'logged in.', user: { userId: user.id, token } });
    return;
  } catch (err) {
    next(err);
  }
}
