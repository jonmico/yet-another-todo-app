import { Router } from 'express';
import { createTodo, getTodo, getTodos } from '../controllers/todo';
import { handleToken } from '../middleware/handleToken';
import editTodo from '../controllers/todo/edit-todo';

export const todoRouter = Router();

todoRouter.post('/', handleToken, createTodo);
todoRouter.get('/', handleToken, getTodos);
todoRouter.get('/:todoId', handleToken, getTodo);
todoRouter.put('/:todoId/edit', handleToken, editTodo);
