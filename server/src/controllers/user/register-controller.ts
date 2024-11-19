import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import bcrypt from 'bcrypt';
import 'dotenv/config';
import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';
import { db } from '../../db/db';
import { refreshToken } from '../../utils/refresh-token';

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
        refreshTokenVersion: true,
        createdAt: true,
        updatedAt: false,
        password: false,
      },
    });

    const payload = {
      id: user.id,
      tokenVersion: user.refreshTokenVersion,
    };

    // TODO: Add access token

    const token = refreshToken(payload);

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
