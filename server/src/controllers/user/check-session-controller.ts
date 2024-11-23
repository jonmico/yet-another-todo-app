import 'dotenv/config';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { z } from 'zod';

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET as string;

const PayloadSchema = z.object({
  id: z.number(),
  createdAt: z.string(),
  iat: z.number(),
  exp: z.number(),
});

export function checkSessionController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    // const { token } = req.cookies;

    // if (!token) {
    //   res.status(401).json({ error: 'No token provided.' });
    //   return;
    // }

    // const payload = jwt.verify(token, ACCESS_TOKEN_SECRET);

    // // TODO: Issue refresh token.

    // const validatedPayload = PayloadSchema.parse(payload);

    res.status(200).json({ message: 'Active session.' });
    return;
  } catch (err) {
    if (err instanceof z.ZodError) {
      res.status(400).json({ error: 'Invalid token.', details: err.issues });
      return;
    }

    if (err instanceof jwt.JsonWebTokenError) {
      res.status(401).json({ error: 'Token error.', details: err.message });
      return;
    }

    if (err instanceof jwt.TokenExpiredError) {
      res.status(401).json({
        error: 'Token expired.',
        details: { expiredAt: err.expiredAt },
      });
      return;
    }

    next(err);
  }
}
