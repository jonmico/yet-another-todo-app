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
  if (err instanceof PrismaClientKnownRequestError) {
    console.error(err);
    res.status(500).json({ error: 'Database error.', details: err.meta });
  } else if (err instanceof Error) {
    console.error(err);
    res
      .status(500)
      .json({ error: 'Server error.', message: err.message, stack: err.stack });
  } else {
    console.error(err);
    res.status(500).json({ error: 'Unknown error occurred.' });
  }
});
