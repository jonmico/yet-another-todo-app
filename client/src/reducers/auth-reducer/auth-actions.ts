type CreateUser = {
  type: 'auth/createUser';
  payload: {
    id: string;
  };
};

type Login = {
  type: 'auth/login';
  payload: {
    id: string;
  };
};

export type AuthAction = CreateUser | Login;
