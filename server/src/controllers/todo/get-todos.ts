import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';
import { db } from '../../db/db';
import { verifyToken } from '../../utils/verify-token';

const CookieSchema = z.object({
  token: z.string(),
});

const tokenSchema = z.object({
  id: z.string(),
  createdAt: z.string(),
  email: z.string().email(),
  iat: z.number(),
  exp: z.number(),
});

export async function getTodos(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const cookieResult = CookieSchema.safeParse(req.cookies);

    console.log(cookieResult);

    // if (!result.success) {
    //   const errors = result.error.flatten().fieldErrors;

    //   res.status(400).json({
    //     error: {
    //       userId: errors.userId?.join(', '),
    //     },
    //   });
    //   return;
    // }

    if (!cookieResult.success) {
      res.json({ message: 'something is wrong with the cookie' });
      return;
    }

    const token = verifyToken(cookieResult.data.token);

    const parsedToken = tokenSchema.safeParse(token);

    console.log('parsedToken', parsedToken);

    if (!parsedToken.success) {
      res.json({ message: 'Missing token field?' });
      return;
    }

    const todos = await db.todo.findMany({
      where: { userId: parsedToken.data?.id },
    });

    res.json({ todos });
  } catch (err) {
    next(err);
  }
}
