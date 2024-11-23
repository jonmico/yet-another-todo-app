import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import { signAccessToken } from '../utils/sign-access-token';

const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET as string;

const CookieSchema = z.object({
  accessToken: z.string().optional(),
  refreshToken: z.string().optional(),
});

const RefreshTokenSchema = z.object({
  id: z.string(),
  refreshTokenVersion: z.number(),
});

export function verifyTokens(req: Request, res: Response, next: NextFunction) {
  try {
    const validatedCookies = CookieSchema.parse(req.cookies);

    if (!validatedCookies.accessToken) {
      if (validatedCookies.refreshToken) {
        const refreshTokenPayload = jwt.verify(
          validatedCookies.refreshToken,
          REFRESH_TOKEN_SECRET
        );

        const validatedRefreshTokenPayload =
          RefreshTokenSchema.parse(refreshTokenPayload);

        // TODO: Implement DB query to get createdAt so we can issue new accessToken.
        // TODO: Check refreshTokenVersion against DB.
      } else {
        res.status(401).json({ error: 'No tokens provided.' });
        return;
      }
    }

    next();
  } catch (err) {
    next(err);
  }
}
