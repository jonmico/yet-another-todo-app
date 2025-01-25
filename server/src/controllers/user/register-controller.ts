import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import bcrypt from 'bcrypt';
import 'dotenv/config';
import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';
import { db } from '../../db/db';
import { signToken } from '../../utils/sign-token';

const RegisterSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: 'Password must have at least 8 characters.' })
    .max(50),
});

interface ErrorReturn {
  email?: string;
  password?: string;
}

export async function registerController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const result = RegisterSchema.safeParse(req.body);

    if (!result.success) {
      console.log('Error Log:', result.error);
      const errorMessage = result.error.flatten().fieldErrors;

      console.log('Error message:', errorMessage);

      const error: ErrorReturn = {
        email: errorMessage.email?.join(', '),
        password: errorMessage.password?.join(', '),
      };

      res.status(400).json({ formError: error });
      return;
    }

    const { data } = result;

    const hash = await bcrypt.hash(data.password, 10);

    const user = await db.user.create({
      data: {
        email: data.email,
        password: hash,
      },
      select: {
        id: true,
        email: true,
        createdAt: true,
        updatedAt: false,
        password: false,
      },
    });

    const jwtPayload = {
      id: user.id,
      createdAt: user.createdAt,
      email: user.email,
    };

    const token = signToken(jwtPayload);

    res.status(201).json({
      message: 'successfully created user.',
      userData: { user, token },
    });

    return;
  } catch (err) {
    if (err instanceof PrismaClientKnownRequestError) {
      if (err.code === 'P2002') {
        res.status(400).json({ message: 'Email is already in use.' });
        return;
      }
    }

    next(err);
  }
}
