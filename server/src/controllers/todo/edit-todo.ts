import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';
import { db } from '../../db/db';

const EditTodoSchema = z.object({
  title: z.string(),
  description: z.string().min(5),
});

export default async function editTodo(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const reqResult = EditTodoSchema.safeParse(req.body);

    if (!reqResult.success) {
      const errors = reqResult.error.flatten().fieldErrors;

      res.status(400).json({
        error: {
          title: errors.title?.join(', '),
          description: errors.description?.join(', '),
        },
      });
      return;
    }

    const { todoId } = req.params;
    const { userId } = res.locals;

    const todo = await db.todo.findFirst({ where: { id: todoId } });

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

    const { title, description } = reqResult.data;

    const updatedTodo = await db.todo.update({
      where: { id: todoId },
      data: {
        title,
        description,
      },
    });

    res.json({ message: 'todo updated.', todo: updatedTodo });
  } catch (err) {
    next(err);
  }
}
