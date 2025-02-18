import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';
import { db } from '../../db/db';
import { verifyToken } from '../../utils/verify-token';

const GetTodosSchema = z.object({
  userId: z.string(),
});

const CookieSchema = z.object({
  token: z.string(),
});

export async function getTodos(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    // const result = GetTodosSchema.safeParse(req.body);

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

    console.log('hello', token);

    // const todos = await db.todo.findMany({
    //   where: { userId: result.data.userId },
    // });

    // res.json({ todos });
    res.json({ message: 'under construction' });
  } catch (err) {
    next(err);
  }
}
