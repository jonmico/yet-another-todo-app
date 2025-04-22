import { NextFunction, Request, Response } from 'express';
import { db } from '../../db/db';

export async function deleteTodo(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = res.locals.userId as string;
    const { todoId } = req.params;

    const todo = await db.todo.findUnique({ where: { id: todoId } });

    if (!todo) {
      res.status(404).json({ error: { _server: 'todo not found.' } });
      return;
    }

    if (todo.userId !== userId) {
      res.status(403).json({
        error: { _server: 'You are not authorized to perform this action.' },
      });
      return;
    }

    await db.todo.delete({ where: { id: todoId, userId } });

    res.json({ message: 'todo deleted.' });
  } catch (err) {
    next(err);
  }
}
