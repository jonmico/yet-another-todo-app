import { useReducer } from 'react';
import { authReducer } from '../../reducers/auth-reducer/auth-reducer';
import { AuthContext, initialState } from './auth-context';

interface AuthProviderProps {
  children: React.ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const [authState, authDispatch] = useReducer(authReducer, initialState);

  return (
    <AuthContext.Provider value={{ authState, authDispatch }}>
      {children}
    </AuthContext.Provider>
  );
}
