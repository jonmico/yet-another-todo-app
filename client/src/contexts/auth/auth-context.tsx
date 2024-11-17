import { createContext } from 'react';
import { AuthAction } from '../../reducers/auth-reducer/auth-actions';
import { AuthState } from '../../reducers/auth-reducer/auth-reducer';

export interface AuthContextInterface {
  authState: AuthState;
  authDispatch: React.Dispatch<AuthAction>;
}

export const AuthContext = createContext<AuthContextInterface | null>(null);

export const initialState: AuthState = {
  id: null,
  isAuthenticated: false,
  isFetching: true,
};
