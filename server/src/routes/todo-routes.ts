import { Router } from 'express';
import { createTodoController } from '../controllers/todo/create-todo-controller';
import { getTodos } from '../controllers/todo/get-todos';

export const todoRouter = Router();

todoRouter.post('/', createTodoController);
todoRouter.post('/get-todos', getTodos);
