import { AuthAction } from './auth-actions';

export interface AuthState {
  id: string | null;
  isAuthenticated: boolean;
  isFetching: boolean;
}

export function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'auth/createUser': {
      const {
        payload: { id },
      } = action;
      return {
        ...state,
        id,
        isAuthenticated: true,
        isFetching: false,
      };
    }
    case 'auth/login': {
      return {
        ...state,
        id: action.payload.id,
        isAuthenticated: true,
        isFetching: false,
      };
    }
    default:
      throw new TypeError('Unrecognized type.');
  }
}
