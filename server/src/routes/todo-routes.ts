import { Router } from 'express';
import { createTodoController } from '../controllers/todo/create-todo-controller';

export const todoRouter = Router();

todoRouter.post('/', createTodoController);
