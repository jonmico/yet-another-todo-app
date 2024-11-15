import { createContext, useReducer } from 'react';
import { authReducer, AuthState } from '../reducers/auth-reducer/auth-reducer';

interface AuthContextInterface {
  authState: AuthState;
}

export const AuthContext = createContext<AuthContextInterface | null>(null);

const initialState: AuthState = {
  id: null,
  isAuthenticated: false,
  isFetching: true,
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const [authState, authDispatch] = useReducer(authReducer, initialState);
  return (
    <AuthContext.Provider value={authState}>{children}</AuthContext.Provider>
  );
}
