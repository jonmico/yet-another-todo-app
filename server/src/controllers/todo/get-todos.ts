import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';
import { db } from '../../db/db';

const GetTodosSchema = z.object({
  userId: z.string(),
});

export async function getTodos(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const result = GetTodosSchema.safeParse(req.body);

    if (!result.success) {
      const errors = result.error.flatten().fieldErrors;

      res.status(400).json({
        error: {
          userId: errors.userId?.join(', '),
        },
      });
      return;
    }

    const todos = await db.todo.findMany({
      where: { userId: result.data.userId },
    });

    res.json({ todos });
  } catch (err) {
    next(err);
  }
}
