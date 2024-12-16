import { createContext, useState } from 'react';

interface AuthContextInterface {
  userId: string | undefined;
  isAuthenticated: boolean;
  setUser: (userId: string, isAuthenticated: boolean) => void;
}

const initialState: AuthContextInterface = {
  userId: '',
  isAuthenticated: false,
  setUser: () => {},
};

export const AuthContext = createContext<AuthContextInterface>(initialState);

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [userId, setUserId] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  function setUser(userId: string, isAuthenticated: boolean) {
    setUserId(userId);
    setIsAuthenticated(isAuthenticated);
  }

  const value = { userId, isAuthenticated, setUser };

  return <AuthContext value={value}>{children}</AuthContext>;
}
