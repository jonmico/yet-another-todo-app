import { createCookieSessionStorage } from 'react-router';

type SessionData = {
  userId: string;
};

type SessionFlashData = {
  error: string;
};

export const sessionCookie = createCookieSessionStorage<
  SessionData,
  SessionFlashData
>({
  cookie: {
    name: 'session',
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    path: '/',
    sameSite: 'lax',
  },
});

type TokenData = {
  token: string;
};

type TokenFlashData = {
  error: string;
};

export const tokenCookie = createCookieSessionStorage<
  TokenData,
  TokenFlashData
>({
  cookie: {
    name: 'token',
    httpOnly: true,
    path: '/',
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  },
});
