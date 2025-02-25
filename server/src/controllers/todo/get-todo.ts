import { NextFunction, Request, Response } from 'express';
import { db } from '../../db/db';
import { verifyToken } from '../../utils/verify-token';

// TODO: Add Zod validation.

type VerifiedToken = {
  id: string;
};

export async function getTodo(req: Request, res: Response, next: NextFunction) {
  try {
    const { todoId } = req.params;
    const { token } = req.cookies;

    const verifiedToken = verifyToken(token) as VerifiedToken;

    const todo = await db.todo.findFirst({ where: { id: todoId } });

    if (todo?.userId !== verifiedToken.id) {
      res.json({ message: 'Access denied, bozo.' });
      return;
    }

    res.json({ todo });
  } catch (err) {
    next(err);
  }
}
