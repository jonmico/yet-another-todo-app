import { createCookie } from 'react-router';

export const sessionCookie = createCookie('__session', {
  httpOnly: true,
  path: '/',
  sameSite: 'lax',
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
});

export const tokenCookie = createCookie('token', {
  httpOnly: true,
  path: '/',
  sameSite: 'lax',
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
});
