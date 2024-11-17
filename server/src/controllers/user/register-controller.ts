import { NextFunction, Request, Response } from 'express';
import { db } from '../../db/db';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { z } from 'zod';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

const JWT_SECRET = process.env.JWT_SECRET as string;
const JWT_EXPIRES_IN = '1h';
const COOKIE_MAX_AGE = 60 * 60 * 1000;

const RegisterSchema = z.object({
  user: z.object({
    email: z.string().email(),
    password: z.string().min(8).max(50),
  }),
});

export async function registerController(
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
        email: false,
        createdAt: true,
        updatedAt: false,
        password: false,
      },
    });

    const payload = {
      id: user.id,
      createdAt: user.createdAt,
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: COOKIE_MAX_AGE,
    });

    res.status(201).json({ message: 'successfully created user.', user });
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
