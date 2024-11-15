import { AuthAction } from './auth-actions';

export interface AuthState {
  id: number | null;
  isAuthenticated: boolean;
  isFetching: boolean;
}

export function authReducer(state: AuthState, action: AuthAction) {
  switch (action.type) {
    case 'auth/createUser': {
      const {
        payload: { isAuthenticated, id },
      } = action;
      return {
        ...state,
        isAuthenticated,
        id,
        isFetching: false,
      };
    }
    default: {
      throw new TypeError('Unrecognized type.');
    }
  }
}
