type CreateUser = {
  type: 'auth/createUser';
  payload: {
    id: number;
  };
};

export type AuthAction = CreateUser;
