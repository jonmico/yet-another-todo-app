import 'dotenv/config';
import { NextFunction, Request, Response } from 'express';

export function checkSessionController(
  req: Request,
  res: Response,
  _next: NextFunction
) {
  res.json({ user: req.user });

  return;
}
