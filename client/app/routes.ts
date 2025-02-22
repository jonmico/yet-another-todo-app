import {
  type RouteConfig,
  index,
  layout,
  route,
} from '@react-router/dev/routes';

export default [
  layout('./app-layout.tsx', [
    index('./routes/home-page.tsx'),
    route('app', './routes/app-page.tsx', [
      index('./routes/dashboard.tsx'),
      route('create-todo', './routes/create-todo.tsx'),
    ]),
  ]),
  route('login', './routes/login-page.tsx'),
  route('register', './routes/register-page.tsx'),
] satisfies RouteConfig;
