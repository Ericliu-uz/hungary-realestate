import axios, { AxiosError, AxiosResponse } from 'axios';
import qs from 'qs';
import { StatusCodes } from 'http-status-codes';
import { Message } from 'shared';

export const loginAsync = async ({ username, password }: AuthRequestValues) => {
  const data = { username, password, grant_type: 'password' };
  try {
    const res = await axios.post<string, AxiosResponse<AuthResponseValues>>(
      `${process.env.REACT_APP_API_URL}auth/token`,
      qs.stringify(data),
    );
    return Promise.resolve(res.data);
  } catch (err) {
    const status = (err as AxiosError).response?.status;
    switch (status) {
      case StatusCodes.UNAUTHORIZED:
        return Promise.reject(Message.Error.LoginFail);
      default:
        return Promise.reject(Message.Error.Common);
    }
  }
};

export const fetchUser = async () => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}api/user`);
    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};
