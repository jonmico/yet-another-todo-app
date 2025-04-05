import { createCookieSessionStorage } from 'react-router';

// Maybe make a .server directory and make separate files for each of these cookies.

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
    maxAge: 1000,
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
    maxAge: 1000,
  },
});
