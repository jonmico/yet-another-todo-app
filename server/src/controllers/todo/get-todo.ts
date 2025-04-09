import { NextFunction, Request, Response } from 'express';
import { db } from '../../db/db';

export async function getTodo(req: Request, res: Response, next: NextFunction) {
  try {
    const { todoId } = req.params;
    const userId = res.locals.userId;

    const todo = await db.todo.findFirst({ where: { id: todoId } });

    if (!todo) {
      res.status(404).json({ error: { _server: 'Todo not found.' } });
      return;
    }

    if (todo.userId !== userId) {
      res
        .status(403)
        .json({
          error: { _server: 'You are not authorized to access this record.' },
        });
      return;
    }

    res.json({ todo });
  } catch (err) {
    next(err);
  }
}
