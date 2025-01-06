import { createCookieSessionStorage } from 'react-router';

interface SessionData {
  refreshToken: string;
  accessToken: string;
}

interface SessionFlashData {
  error: string;
}

export const { getSession, commitSession, destroySession } =
  createCookieSessionStorage<SessionData, SessionFlashData>({
    cookie: {
      name: '__session',
      httpOnly: true,
      path: '/',
      sameSite: 'lax',
      maxAge: 15 * 60 * 1000, // 15min
    },
  });
