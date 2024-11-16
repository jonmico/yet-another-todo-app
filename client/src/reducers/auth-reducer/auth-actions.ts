type CreateUser = {
  type: 'auth/createUser';
  payload: {
    isAuthenticated: boolean;
    id: number;
  };
};

export type AuthAction = CreateUser;
