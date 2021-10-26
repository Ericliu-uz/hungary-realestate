interface AuthRequestValues {
  username: string;
  password: string;
}

interface AuthResponseValues {
  access_token: string;
}

interface UserModel {
  password: string;
  uid: string;
  username: string;
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
