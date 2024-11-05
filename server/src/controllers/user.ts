import { NextFunction, Request, Response } from 'express';
import { db } from '../db/db';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { z } from 'zod';
import bcrypt from 'bcrypt';

const RegisterSchema = z.object({
  user: z.object({
    email: z.string().email(),
    password: z.string().min(8).max(50),
  }),
});

// TODO: Return cookie to client that contains JWT.
export async function register(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const validatedData = RegisterSchema.parse(req.body);

    const {
      user: { email, password },
    } = validatedData;

    const hash = await bcrypt.hash(password, 10);

    const user = await db.user.create({
      data: {
        email,
        password: hash,
      },
      select: {
        id: true,
        email: true,
        createdAt: true,
        updatedAt: true,
        password: false,
      },
    });

    res.status(201).json(user);
    return;
  } catch (err) {
    if (err instanceof PrismaClientKnownRequestError) {
      if (err.code === 'P2002') {
        res.status(400).json({ error: 'Email is already in use.' });
        return;
      }
    }

    if (err instanceof z.ZodError) {
      res.status(409).json({ error: 'Invalid input', details: err.issues });
      return;
    }

    next(err);
  }
}

// TODO: Implement this.
export async function login(req: Request, res: Response) {
  res.send('NYI');
}
