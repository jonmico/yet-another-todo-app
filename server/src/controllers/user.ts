import { NextFunction, Request, Response } from 'express';
import { db } from '../db/db';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

interface RegisterBody {
  user: {
    email: string;
    password: string;
  };
}

// TODO: Add in password hashing.
// TODO: Return cookie to client that contains JWT.
export async function register(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const {
      user: { email, password },
    }: RegisterBody = req.body;

    const user = await db.user.create({
      data: {
        email,
        password,
      },
    });

    res.status(201).json(user);
  } catch (err) {
    if (err instanceof PrismaClientKnownRequestError) {
      if (err.code === 'P2002') {
        res.status(400).json({ error: 'Email is already in use.' });
        return;
      }
    } else {
      next(err);
    }
  }
}

// TODO: Implement this.
export async function login(req: Request, res: Response) {
  res.send('NYI');
}
