import { Router } from 'express';
import { createTodo, getTodo, getTodos } from '../controllers/todo';
import { handleToken } from '../middleware/handleToken';

export const todoRouter = Router();

todoRouter.post('/', handleToken, createTodo);
todoRouter.get('/', getTodos);
todoRouter.get('/:todoId', getTodo);
