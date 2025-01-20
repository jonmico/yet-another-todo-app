import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import 'dotenv/config';
import express, { NextFunction, Request, Response } from 'express';
import { userRouter } from './routes/user-routes';
import cors, { CorsOptions } from 'cors';
import cookieParser from 'cookie-parser';

declare module 'express' {
  interface Request {
    user?: {
      id: string;
    };
  }
}

// TODO: Clean up returns from server. Errors need to make more sense so the frontend can display errors from backend.

const PORT = process.env.PORT;

const app = express();

const corsOptions: CorsOptions = {
  origin: 'http://localhost:5173',
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization', 'Set-Cookie'],
};
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(express.json());

app.use('/api/user', userRouter);

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

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}!`);
});
