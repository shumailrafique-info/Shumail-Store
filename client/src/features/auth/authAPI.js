import axios from "axios";
import {
  loginFailure,
  loginRequest,
  loginSuccess,
  logoutUserFailure,
  logoutUserRequest,
  logoutUserSuccess,
  sendEmailFailure,
  sendEmailRequest,
  sendEmailSuccess,
} from "./authSlice";

export const loginUser = (email, password) => async (dispatch, getState) => {
  try {
    dispatch(loginRequest());
    const { data } = await axios.post(`/api/v1/users/login`, {
      email,
      password,
    });
    dispatch(loginSuccess(data.user));
  } catch (error) {
    console.log(error);
    dispatch(loginFailure(error.response.data.message));
  }
};

export const loadUser = () => async (dispatch, getState) => {
  try {
    dispatch(loginRequest());
    const { data } = await axios.get(`/api/v1/users/me`, {});
    dispatch(loginSuccess(data.user));
  } catch (error) {
    dispatch(loginFailure(error.response.data.message));
  }
};

export const SignUser = (userInfo) => async (dispatch, getState) => {
  try {
    dispatch(loginRequest());
    const { data } = await axios.post(`/api/v1/users/register`, userInfo, {
      headers: { "Content-Type": "application/json" },
    });
    dispatch(loginSuccess(data.user));
  } catch (error) {
    console.log(error);
    dispatch(loginFailure(error.response.data.message));
  }
};

export const logoutLoginUser = () => async (dispatch, getState) => {
  try {
    dispatch(logoutUserRequest());
    const { data } = await axios.get(`/api/v1/users/logout`, {
      headers: { "Content-Type": "application/json" },
    });
    dispatch(logoutUserSuccess(data.message));
  } catch (error) {
    console.log(error);
    dispatch(logoutUserFailure(error.response.data.message));
  }
};

export const forgotPassword = (email) => async (dispatch, getState) => {
  try {
    dispatch(sendEmailRequest());

    const { data } = await axios.post(
      `/api/v1/users/forgot/password`,
      { email },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    dispatch(sendEmailSuccess(data.message));
  } catch (error) {
    console.log(error);
    dispatch(sendEmailFailure(error.response.data.message));
  }
};
