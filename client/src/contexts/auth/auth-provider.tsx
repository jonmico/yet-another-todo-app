import { useReducer } from 'react';
import { authReducer } from '../../reducers/auth-reducer/auth-reducer';
import { AuthContext, initialState } from './auth-context';
import { registerApi } from '../../services/auth-api/register-api';

interface AuthProviderProps {
  children: React.ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const [authState, authDispatch] = useReducer(authReducer, initialState);

  async function register(email: string, password: string) {
    const data = await registerApi(email, password);

    authDispatch({
      type: 'auth/createUser',
      payload: { id: data.data.user.id, isAuthenticated: true },
    });
  }

  return (
    <AuthContext.Provider value={{ authState, authDispatch, register }}>
      {children}
    </AuthContext.Provider>
  );
}
