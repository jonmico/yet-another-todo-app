import { createCookie } from 'react-router';

export const refreshTokenCookie = createCookie('refreshToken', {
  httpOnly: true,
  path: '/',
  sameSite: 'lax',
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
});

export const accessTokenCookie = createCookie('accessToken', {
  httpOnly: true,
  path: '/',
  sameSite: 'lax',
  maxAge: 15 * 60 * 1000, // 15min
});
