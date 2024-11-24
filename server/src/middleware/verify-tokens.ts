import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import 'dotenv/config';
import { NextFunction, Request, Response } from 'express';
import jwt, { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';
import { z } from 'zod';
import { handleRefreshToken } from '../utils/handle-refresh-token';

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET as string;

const CookieSchema = z.object({
  accessToken: z.string().optional(),
  refreshToken: z.string().optional(),
});

const AccessTokenSchema = z.object({
  id: z.string(),
  createdAt: z.string(),
});

export async function verifyTokens(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const cookies = CookieSchema.parse(req.cookies);

    if (!cookies.accessToken) {
      if (!cookies.refreshToken) {
        res.status(401).json({ error: 'No tokens provided.' });
        return;
      }

      await handleRefreshToken(cookies.refreshToken, res, req);

      return next();
    }

    const accessTokenPayload = jwt.verify(
      cookies.accessToken,
      ACCESS_TOKEN_SECRET
    );

    const validatedAccessTokenPayload =
      AccessTokenSchema.parse(accessTokenPayload);

    req.user = { id: validatedAccessTokenPayload.id };

    return next();
  } catch (err) {
    if (err instanceof JsonWebTokenError) {
      res.status(401).json({ error: 'Token error.', details: err.message });
      return;
    }

    if (err instanceof TokenExpiredError) {
      res.status(401).json({
        error: 'Token expired.',
        details: { message: err.message, expiredAt: err.expiredAt },
      });
    }

    if (err instanceof PrismaClientKnownRequestError) {
      res.status(500).json({
        error: 'Server error.',
        details: {
          message: err.message,
          code: err.code,
        },
      });
    }
    return next(err);
  }
}
