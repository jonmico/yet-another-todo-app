import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';

// TODO: Probably add some type of minimum length onto these
const CreateTodoSchema = z.object({
  title: z.string(),
  description: z.string(),
});

// TODO: Build this.
export async function createTodoController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const result = CreateTodoSchema.safeParse(req.body);

  console.log(result);

  res.json(result);
}
