import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import bcrypt from 'bcrypt';
import 'dotenv/config';
import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';
import { db } from '../../db/db';
import { signRefreshToken } from '../../utils/sign-refresh-token';
import { signAccessToken } from '../../utils/sign-access-token';

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

    const refreshTokenPayload = {
      id: user.id,
      tokenVersion: user.refreshTokenVersion,
    };

    const refreshToken = signRefreshToken(refreshTokenPayload);

    res.cookie('refreshToken', refreshToken, {
      httpOnly: false,
      sameSite: 'none',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    const accessToken = signAccessToken({
      id: user.id,
      createdAt: user.createdAt,
    });

    res.cookie('accessToken', accessToken, {
      httpOnly: false,
      sameSite: 'none',
      maxAge: 15 * 60 * 1000, // 15min
    });

    res
      .status(201)
      .json({
        message: 'successfully created user.',
        user,
        refreshToken,
        accessToken,
      });
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
