import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import bcrypt from 'bcrypt';
import 'dotenv/config';
import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';
import { db } from '../../db/db';
import { signToken } from '../../utils/sign-token';

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
        email: true,
        createdAt: true,
        updatedAt: false,
        password: false,
      },
    });

    // const refreshTokenPayload = {
    //   id: user.id,
    //   tokenVersion: user.refreshTokenVersion,
    // };

    // const refreshToken = signRefreshToken(refreshTokenPayload);

    // const accessToken = signAccessToken({
    //   id: user.id,
    //   createdAt: user.createdAt,
    // });

    // res.status(201).json({
    //   message: 'successfully created user.',
    //   user,
    //   refreshToken,
    //   accessToken,
    // })

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
        res.status(400).json({ error: 'Email is already in use.' });
        return;
      }
    }

    // TODO: Find a way to process ZodError so that it is not a mess on frontend.
    if (err instanceof z.ZodError) {
      res.status(409).json({ error: 'Invalid input', details: err.issues });
      return;
    }

    next(err);
  }
}
