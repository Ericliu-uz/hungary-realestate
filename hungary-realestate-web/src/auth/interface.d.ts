interface AuthRequestValues {
  username: string;
  password: string;
}

interface AuthResponseValues {
  access_token: string;
}

interface UserModel {
  password: string;
  userId: string;
  userName: string;
}

interface AuthStateModel {
  token?: string;
  user?: UserModel;
  loggedIn: boolean;
  loading: boolean;
}

interface AuthContextModel {
  authState: AuthStateModel;
  login: (params: AuthRequestValues) => Promise<string>;
  logout: VoidFunction;
}

interface UpdatePasswordValues {
  username: string;
  newPassword: string;
}
