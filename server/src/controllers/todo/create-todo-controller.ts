import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';
import { db } from '../../db/db';

// TODO: Probably add some type of minimum length onto these
const CreateTodoSchema = z.object({
  title: z.string(),
  description: z.string(),
  userId: z.string(),
});

// TODO: Make return better.
// TODO: Error handling.
export async function createTodoController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    console.log(req.body);
    const result = CreateTodoSchema.safeParse(req.body);

    if (!result.success) {
      const errors = result.error.flatten().fieldErrors;

      res.status(400).json({
        error: {
          title: errors.title?.join(', '),
          description: errors.description?.join(', '),
          userId: errors.userId?.join(', '),
        },
      });
      return;
    }

    const todo = await db.todo.create({
      data: {
        title: result.data.title,
        description: result.data.description,
        userId: result.data.userId,
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
