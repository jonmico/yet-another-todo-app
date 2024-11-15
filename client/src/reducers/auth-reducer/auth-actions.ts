type CreateUser = {
  type: 'auth/createUser';
  payload: {
    isAuthenticated: boolean;
    id: string;
  };
};

export type AuthAction = CreateUser;
