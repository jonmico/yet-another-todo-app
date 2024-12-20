import { createContext, useState } from 'react';

interface AuthContextInterface {
  userId: string | undefined;
}

const initialState: AuthContextInterface = {
  userId: '',
};

export const AuthContext = createContext<AuthContextInterface>(initialState);

interface AuthProviderProps {
  children: React.ReactNode;
  userId: string | undefined;
}

export function AuthProvider({ children, userId }: AuthProviderProps) {
  const value = { userId };

  return <AuthContext value={value}>{children}</AuthContext>;
}
