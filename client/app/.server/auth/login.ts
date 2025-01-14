import { db } from '../db';
import type { User } from '@prisma/client';
import bcryptjs from 'bcryptjs';

type LoginReturn = {
  user?: User;
  error?: string;
};

export async function login(
  email: string,
  password: string
): Promise<LoginReturn> {
  const user = await db.user.findUnique({ where: { email } });

  if (!user) {
    return { error: 'No user with that email.' };
  }

  const isValid = bcryptjs.compare(password, user.password);

  if (!isValid) {
    return { error: 'Incorrect email or password.' };
  }

  return { user };
}
