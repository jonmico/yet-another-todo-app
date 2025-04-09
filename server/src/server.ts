import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import 'dotenv/config';
import express, { NextFunction, Request, Response } from 'express';
import { userRouter } from './routes/user';
import { todoRouter } from './routes/todo';
import cors, { CorsOptions } from 'cors';
import cookieParser from 'cookie-parser';
import { JsonWebTokenError } from 'jsonwebtoken';

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
app.use('/api/todo', todoRouter);

/*
API returns errors from server in the form of { error: { _server: "Error here" }}
*/
app.use((err: unknown, req: Request, res: Response, _next: NextFunction) => {
  console.error(err);

  // Catch all PrismaClient errors.
  if (err instanceof PrismaClientKnownRequestError) {
    res.status(500).json({
      error: {
        _server: `${err.name} - ${err.code}: ${err.message}`,
      },
    });
    return;
  }

  // Catch all JWT Errors.
  if (err instanceof JsonWebTokenError) {
    res.status(500).json({
      error: { _server: `${err.name} - ${err.message}` },
    });
  }

  if (err instanceof Error) {
    res.status(500).json({
      error: {
        _server: `Something went wrong. err.message: ${err.message} - err.stack: ${err.stack}`,
      },
    });
    return;
  }

  res.status(500).json({ error: { _server: 'Unknown error occurred.' } });
  return;
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}!`);
});
