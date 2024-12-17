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

const PORT = process.env.PORT;

const app = express();

const corsOptions: CorsOptions = {
  origin: 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Set-Cookie'],
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use('/api/user', userRouter);

app.use((err: unknown, req: Request, res: Response, _next: NextFunction) => {
  console.error(err);

  if (err instanceof PrismaClientKnownRequestError) {
    res.status(500).json({ error: 'Database error.', details: err.meta });
  }

  if (err instanceof Error) {
    res
      .status(500)
      .json({ error: 'Server error.', message: err.message, stack: err.stack });
  }

  res.status(500).json({ error: 'Unknown error occurred.' });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}!`);
});
