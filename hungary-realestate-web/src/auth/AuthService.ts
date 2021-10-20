import axios, { AxiosError, AxiosResponse } from 'axios';
import qs from 'qs';
import { StatusCodes } from 'http-status-codes';

const MSG_SUCCESS_UPDATE_PASSWORD = 'Success! Your password has been updated.';
const MSG_ERROR = 'Sorry, an error occurred. Please try again later.';
const MSG_ERROR_LOGIN_FAIL = 'The username or password is incorrect.';

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
        return Promise.reject(MSG_ERROR_LOGIN_FAIL);
      default:
        return Promise.reject(MSG_ERROR);
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

export const updatePassword = async (data: UpdatePasswordValues) => {
  try {
    await axios.post(`${process.env.REACT_APP_API_URL}api/user`, data);
    return Promise.resolve(MSG_SUCCESS_UPDATE_PASSWORD);
  } catch (err) {
    return Promise.reject(MSG_ERROR);
  }
};
