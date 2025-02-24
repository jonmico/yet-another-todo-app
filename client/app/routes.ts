import {
  type RouteConfig,
  index,
  layout,
  route,
} from '@react-router/dev/routes';

export default [
  layout('./layouts/app-layout.tsx', [
    index('./routes/home-page.tsx'),
    layout('./layouts/protected-app-layout.tsx', [
      route('dashboard', './routes/dashboard.tsx'),
      route('create-todo', './routes/create-todo-page.tsx'),
      route('todo/:todoId', './routes/todo.tsx'),
    ]),
  ]),
  route('login', './routes/login-page.tsx'),
  route('register', './routes/register-page.tsx'),
] satisfies RouteConfig;
