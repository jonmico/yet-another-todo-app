import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';
import { db } from '../../db/db';
import { verifyToken } from '../../utils/verify-token';
import { JsonWebTokenError } from 'jsonwebtoken';

const CookieSchema = z.object({
  token: z.string(),
});

type Token = {
  id: string;
  createdAt: string;
  email: string;
  iat: number;
  exp: number;
};

export async function getTodos(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const cookieResult = CookieSchema.safeParse(req.cookies);

    if (!cookieResult.success) {
      res.status(400).json({ error: { token: 'Missing token.' } });
      return;
    }

    const token = verifyToken(cookieResult.data.token) as Token;

    const todos = await db.todo.findMany({
      where: { userId: token.id },
    });

    res.json({ todos });
  } catch (err) {
    if (err instanceof JsonWebTokenError) {
      res.status(400).json({
        error: { jwtError: { message: err.message, name: err.name } },
      });
      return;
    }
    next(err);
  }
}
