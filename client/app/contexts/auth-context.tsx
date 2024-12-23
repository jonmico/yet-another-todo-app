import { createContext, useEffect, useState } from 'react';

interface AuthContextInterface {
  user: string | null;
}

const initialState: AuthContextInterface = {
  user: '',
};

export const AuthContext = createContext<AuthContextInterface>(initialState);

interface AuthProviderProps {
  children: React.ReactNode;
  userId: string | undefined;
}

export function AuthProvider({ children, userId }: AuthProviderProps) {
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    if (userId) {
      setUser(userId);
    }
  }, []);

  const value = { user };

  return <AuthContext value={value}>{children}</AuthContext>;
}
