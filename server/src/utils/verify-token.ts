import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET as string;

export function verifyToken(t: string) {
  const token = jwt.verify(t, JWT_SECRET);

  return token;
}
