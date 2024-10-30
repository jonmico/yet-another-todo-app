import express, { Request, Response } from 'express';
import { db } from './db/db';

const app = express();

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello from Express!');
});

app.get('/getAllUsers', async (req: Request, res: Response) => {
  const users = await db.user.findMany();

  res.json(users);
});

app.post('/register', async (req: Request, res: Response) => {
  const {
    user: { email, password },
  }: { user: { email: string; password: string } } = req.body;

  const newUser = await db.user.create({
    data: {
      email,
      password,
    },
  });

  res.json(newUser);
});

app.listen(3000, () => {
  console.log('App is listening on Port 3000!');
});
