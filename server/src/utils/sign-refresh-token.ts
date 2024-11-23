import jwt from 'jsonwebtoken';
import 'dotenv/config';

const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET as string;

type RefreshTokenPayload = {
  id: string;
  tokenVersion: number;
};

export function signRefreshToken(payload: RefreshTokenPayload) {
  const token = jwt.sign(payload, REFRESH_TOKEN_SECRET, { expiresIn: '7d' });

  return token;
}
