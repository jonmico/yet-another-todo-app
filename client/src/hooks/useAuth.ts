import { use } from 'react';
import { AuthContext } from '../contexts/auth/auth-context';

export function useAuth() {
  const value = use(AuthContext);

  if (!value) {
    throw new Error('useAuth must be used within AuthProvider.');
  }

  return value;
}
