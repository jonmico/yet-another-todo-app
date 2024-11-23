import jwt from 'jsonwebtoken';
import 'dotenv/config';

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET as string;

interface AccessTokenPayload {
  id: string;
  createdAt: Date;
}

export function signAccessToken(payload: AccessTokenPayload) {
  const token = jwt.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: '15m' });

  return token;
}
