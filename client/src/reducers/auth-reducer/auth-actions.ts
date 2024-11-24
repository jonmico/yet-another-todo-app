type CreateUser = {
  type: 'auth/createUser';
  payload: {
    id: string;
  };
};

export type AuthAction = CreateUser;
