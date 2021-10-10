import axios, { AxiosResponse } from 'axios';
import qs from 'qs';
import { StatusCodes } from 'http-status-codes';

const MSG_SUCCESS_RESET_PASSWORD = 'Success! You will receive an email with password reset instructions in a moment.';
const MSG_SUCCESS_UPDATE_PASSWORD = 'Success! Your password has been updated.';
const MSG_ERROR = 'Sorry, an error occurred. Please try again later.';
const MSG_ERROR_LOGIN_FAIL = 'The username or password is incorrect.';
const MSG_ERROR_NOT_FOUND = `Sorry, we couldn't find an account with the username.`;

export const loginAsync = async ({ username, password }: AuthRequestValues) => {
  const data = { username, password, grant_type: 'password' };
  try {
    const res = await axios.post<string, AxiosResponse<AuthResponseValues>>(`${process.env.API_AUTH}token`, qs.stringify(data));
    return Promise.resolve(res.data);
  } catch (err) {
    console.error(err);
    return Promise.reject(MSG_ERROR);
    // switch (status) {
    //   case StatusCodes.BAD_REQUEST:
    //     return Promise.reject(MSG_ERROR_LOGIN_FAIL);
    //   default:
    //     return Promise.reject(MSG_ERROR);
    // }
  }
};

export const fetchUser = async () => {
  try {
    const res = await axios.get(`${process.env.API_AUTH}api/user`);
    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const resetPassword = async (username: string) => {
  try {
    await axios.post(`${process.env.API_RESET_PASSWORD}&userName=${username}`);
    return Promise.resolve(MSG_SUCCESS_RESET_PASSWORD);
  } catch (err) {
    console.error(err);
    return Promise.reject(MSG_ERROR);
    // const status = err?.status;
    // switch (status) {
    //   case StatusCodes.NOT_FOUND:
    //     return Promise.reject(MSG_ERROR_NOT_FOUND);
    //   default:
    //     return Promise.reject(MSG_ERROR);
    // }
  }
};

export const updatePassword = async (data: UpdatePasswordValues) => {
  try {
    await axios.post(`${process.env.API_AUTH}api/user/UpdateUserInfo`, data);
    return Promise.resolve(MSG_SUCCESS_UPDATE_PASSWORD);
  } catch (err) {
    return Promise.reject(MSG_ERROR);
  }
};
