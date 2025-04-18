import {
  type RouteConfig,
  index,
  layout,
  route,
} from '@react-router/dev/routes';

export default [
  layout('./layouts/app-layout.tsx', [
    index('./routes/index.tsx'),
    layout('./layouts/protected-app-layout.tsx', [
      route('dashboard', './routes/dashboard.tsx'),
      route('create-todo', './routes/create-todo.tsx'),
      route('todo/:todoId', './routes/todo.tsx'),
      route('todo/:todoId/edit', './routes/edit-todo.tsx'),
    ]),
  ]),
  route('login', './routes/login.tsx'),
  route('register', './routes/register.tsx'),
] satisfies RouteConfig;
