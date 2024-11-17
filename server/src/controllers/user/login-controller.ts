import { NextFunction, Request, Response } from 'express';

export async function loginController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    console.log('NYI');
  } catch (err) {
    next(err);
  }
}
