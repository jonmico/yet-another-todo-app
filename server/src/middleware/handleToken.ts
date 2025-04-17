import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';
import { verifyToken } from '../utils/verify-token';

const CookieSchema = z.object({
  token: z.string(),
});

const TokenSchema = z.object({
  id: z.string(),
  createdAt: z.string(),
  email: z.string().email(),
  iat: z.number(),
  exp: z.number(),
});

export async function handleToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const cookieResult = CookieSchema.safeParse(req.cookies);

    if (!cookieResult.success) {
      res.json({ error: { _server: 'Missing token in cookie.' } });
      return;
    }

    const token = verifyToken(cookieResult.data.token);

    const validatedToken = TokenSchema.safeParse(token);

    if (!validatedToken.success) {
      res.json({ error: { _server: 'Missing field in token.' } });
      return;
    }

    res.locals.userId = validatedToken.data.id;

    next();
  } catch (err) {
    next(err);
  }
}
