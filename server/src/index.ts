import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import 'dotenv/config';
import express, { NextFunction, Request, Response } from 'express';
import { userRouter } from './routes/user';

const PORT = process.env.PORT;

const app = express();

app.use(express.json());

app.use('/user', userRouter);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}!`);
});

app.use((err: unknown, req: Request, res: Response, _next: NextFunction) => {
  console.error(err);

  if (err instanceof PrismaClientKnownRequestError) {
    res.status(500).json({ error: 'Database error.', details: err.meta });
    return;
  }

  if (err instanceof Error) {
    res
      .status(500)
      .json({ error: 'Server error.', message: err.message, stack: err.stack });
    return;
  }

  res.status(500).json({ error: 'Unknown error occurred.' });
  return;
});
