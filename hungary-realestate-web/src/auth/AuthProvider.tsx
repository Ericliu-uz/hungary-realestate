import React, { FC, createContext, useState, useEffect, useMemo, useContext } from 'react';
import axios from 'axios';
import { StatusCodes } from 'http-status-codes';
import { fetchUser, loginAsync } from './AuthService';

const TOKEN_KEY = 'token';

// const setAxiosHeader = (token: string) => {
//   axios.defaults.headers.common.Authorization = `Bearer ${token}`;
// };

// const removeAxiosHeader = () => {
//   delete axios.defaults.headers.common.Authorization;
// };

const AuthContext = createContext<AuthContextModel>({} as AuthContextModel);

export const AuthProvider: FC = ({ children }) => {
  const [authState, setAuthState] = useState<AuthStateModel>({
    token: undefined,
    user: undefined,
    loggedIn: false,
    loading: true,
  });

  useEffect(() => {
    const bootstrapAsync = async () => {
      const token = localStorage.getItem(TOKEN_KEY);
      if (token) {
        await handleLogin(token);
      } else {
        await logout();
      }
      axios.interceptors.response.use(
        (res) => res,
        async ({ response }) => {
          console.error(response);
          return Promise.reject(response);
          // switch (response?.status) {
          //   case StatusCodes.UNAUTHORIZED:
          //     logout();
          //   // eslint-disable-next-line no-fallthrough
          //   default:
          //     return Promise.reject(response);
          // }
        },
      );
    };

    bootstrapAsync();
  }, []);

  const login = async (data: AuthRequestValues) => {
    try {
      const res = await loginAsync(data);
      await handleLogin(res.token);
      return Promise.resolve(res.token);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const handleLogin = async (token: string) => {
    try {
      localStorage.setItem(TOKEN_KEY, token);
      // setAxiosHeader(token);
      const user = await fetchUser();
      setAuthState({ token, user, loggedIn: true, loading: false });
    } catch (error) {
      setAuthState({ token: undefined, user: undefined, loggedIn: false, loading: false });
      console.error(error);
    }
  };

  const logout = async () => {
    try {
      localStorage.removeItem(TOKEN_KEY);
      // removeAxiosHeader();
      setAuthState({ token: undefined, user: undefined, loggedIn: false, loading: false });
    } catch (error) {
      console.error(error);
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const value = useMemo(() => ({ authState, login, logout }), [authState]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);