import jwt from 'jsonwebtoken';
import 'dotenv/config';

const JWT_SECRET = process.env.JWT_SECRET as string;

type JWT_Payload = {
  id: string;
  createdAt: Date;
  email: string;
};

export function signToken(payload: JWT_Payload) {
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });

  return token;
}
