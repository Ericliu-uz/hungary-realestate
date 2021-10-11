import axios, { AxiosResponse } from 'axios';
import qs from 'qs';
import { StatusCodes } from 'http-status-codes';

const MSG_SUCCESS_UPDATE_PASSWORD = 'Success! Your password has been updated.';
const MSG_ERROR = 'Sorry, an error occurred. Please try again later.';

export const loginAsync = async ({ username, password }: AuthRequestValues) => {
  const data = { username, password, grant_type: 'password' };
  try {
    const res = await axios.post<string, AxiosResponse<AuthResponseValues>>(`${process.env.API_URL}token`, qs.stringify(data));
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
    const res = await axios.get(`${process.env.API_URL}api/user`);
    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const updatePassword = async (data: UpdatePasswordValues) => {
  try {
    await axios.post(`${process.env.API_URL}api/user/UpdateUserInfo`, data);
    return Promise.resolve(MSG_SUCCESS_UPDATE_PASSWORD);
  } catch (err) {
    return Promise.reject(MSG_ERROR);
  }
};
