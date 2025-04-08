import { NextFunction, Request, Response } from 'express';
import { db } from '../../db/db';
import { verifyToken } from '../../utils/verify-token';

type VerifiedToken = {
  id: string;
};

// TODO: Add Zod validation.
export async function getTodo(req: Request, res: Response, next: NextFunction) {
  try {
    const { todoId } = req.params;
    const userId = res.locals.userId;

    const todo = await db.todo.findFirst({ where: { id: todoId } });

    if (todo?.userId !== userId) {
      res.json({ message: 'Access denied, bozo.' });
      return;
    }

    res.json({ todo });
  } catch (err) {
    next(err);
  }
}
