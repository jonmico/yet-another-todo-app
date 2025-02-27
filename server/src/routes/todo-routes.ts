import { Router } from 'express';
import { createTodo, getTodo, getTodos } from '../controllers/todo';

export const todoRouter = Router();

todoRouter.post('/', createTodo);
todoRouter.get('/', getTodos);
todoRouter.get('/:todoId', getTodo);
