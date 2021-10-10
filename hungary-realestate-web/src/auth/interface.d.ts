interface AuthRequestValues {
  username: string;
  password: string;
}

interface AuthResponseValues {
  token: string;
}

interface RoleModel {
  roleId: number;
  roleName: string;
}

interface UserModel {
  bannerId: string;
  buygroupId: number;
  companyName: string;
  countryId: number;
  email: string;
  isAgreeTerm: boolean;
  logoUrl: string;
  newPassword: string | null;
  password: string;
  personName: string;
  roles: RoleModel[];
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
  email: string;
  personName: string;
  userName: string;
  newPassword: string;
}
