import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';
import { db } from '../../db/db';

const CreateTodoSchema = z.object({
  title: z.string().optional(),
  description: z.string().min(5),
  dueDate: z.string().optional(),
});

export async function createTodo(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = res.locals.userId as string;

    const reqResult = CreateTodoSchema.safeParse(req.body);

    if (!reqResult.success) {
      const errors = reqResult.error.flatten().fieldErrors;

      res.status(400).json({
        error: {
          title: errors.title?.join(', '),
          description: errors.description?.join(', '),
          dueDate: errors.dueDate?.join(', '),
        },
      });
      return;
    }

    const todo = await db.todo.create({
      data: {
        title: reqResult.data.title,
        description: reqResult.data.description,
        dueDate: reqResult.data.dueDate
          ? new Date(reqResult.data.dueDate)
          : undefined,
        userId,
      },
    });

    res.json({
      message: 'todo created.',
      todo,
    });
    return;
  } catch (err) {
    next(err);
  }
}
