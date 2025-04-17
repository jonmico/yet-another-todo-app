import { NextFunction, Request, Response } from 'express';
import { JsonWebTokenError } from 'jsonwebtoken';
import { db } from '../../db/db';

export async function getTodos(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = res.locals.userId;

    const todos = await db.todo.findMany({
      where: { userId },
    });

    res.json({ todos });
  } catch (err) {
    next(err);
  }
}
