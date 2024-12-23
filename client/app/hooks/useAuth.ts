import { use } from 'react';
import { AuthContext } from '~/contexts/auth-context';

export function useAuth() {
  const value = use(AuthContext);

  if (!value) {
    throw new Error('Cannot access AuthContext outside of AuthProvider.');
  }

  return value;
}
