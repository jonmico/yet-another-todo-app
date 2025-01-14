import { db } from '../db';
import bcryptjs from 'bcryptjs';

export async function createUser(email: string, password: string) {
  const hash = await bcryptjs.hash(password, 10);

  const user = await db.user.create({
    data: {
      email: email,
      password: hash,
    },
  });

  return user;
}
