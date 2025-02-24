import { Router } from 'express';
import { createTodoController } from '../controllers/todo/create-todo-controller';
import { getTodos } from '../controllers/todo/get-todos';
import { getTodo } from '../controllers/todo/get-todo';

export const todoRouter = Router();

todoRouter.post('/', createTodoController);
todoRouter.get('/', getTodos);
todoRouter.get('/:todoId', getTodo);
