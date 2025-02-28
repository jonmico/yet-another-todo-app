import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';
import { db } from '../../db/db';

const CreateTodoSchema = z.object({
  title: z.string(),
  description: z.string().min(5),
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
        },
      });
      return;
    }

    const todo = await db.todo.create({
      data: {
        title: reqResult.data.title,
        description: reqResult.data.description,
        userId,
      },
    });

    res.json({
      message: 'todo created.',
      todo,
    });
  } catch (err) {
    next(err);
  }
}
