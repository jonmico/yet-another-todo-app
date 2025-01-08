import { createCookieSessionStorage } from 'react-router';

type SessionData = {
  userId: string;
  token: string;
};

type SessionFlashData = {
  error: string;
};

export const { getSession, commitSession, destroySession } =
  createCookieSessionStorage<SessionData, SessionFlashData>({
    cookie: {
      name: 'session',
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      path: '/',
      sameSite: 'lax',
    },
  });
