import { z } from 'zod';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import { signAccessToken } from './sign-access-token';
import { db } from '../db/db';

const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET as string;

const RefreshTokenSchema = z.object({
  id: z.string(),
  tokenVersion: z.number(),
});

export async function handleRefreshToken(
  refreshToken: string,
  res: Response,
  req: Request
) {
  const refreshTokenPayload = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET);

  const validatedRefreshTokenPayload =
    RefreshTokenSchema.parse(refreshTokenPayload);

  const user = await db.user.findUnique({
    where: {
      id: validatedRefreshTokenPayload.id,
    },
    select: {
      refreshTokenVersion: true,
      createdAt: true,
      id: true,
    },
  });

  if (!user) {
    res.status(404).json({ error: 'User not found.' });
    return;
  }

  if (validatedRefreshTokenPayload.tokenVersion !== user.refreshTokenVersion) {
    res.status(401).json({ error: 'Invalid refreshTokenVersion' });
    return;
  }

  const accessToken = signAccessToken({
    id: user.id,
    createdAt: user.createdAt,
  });

  res.cookie('accessToken', accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 15 * 60 * 1000, // 15min
  });

  req.user = { id: user.id };
}
