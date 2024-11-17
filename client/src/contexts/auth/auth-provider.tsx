import { useEffect, useReducer } from 'react';
import { authReducer } from '../../reducers/auth-reducer/auth-reducer';
import { AuthContext, initialState } from './auth-context';
import { checkSessionApi } from '../../services/auth-api/check-session-api';

interface AuthProviderProps {
  children: React.ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const [authState, authDispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    async function checkSession() {
      const data: { message: string; id: number } = await checkSessionApi();

      authDispatch({ type: 'auth/createUser', payload: { id: data.id } });
    }

    checkSession();
  }, []);

  return (
    <AuthContext.Provider value={{ authState, authDispatch }}>
      {children}
    </AuthContext.Provider>
  );
}
