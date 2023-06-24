import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  loading: false,
  message: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginRequest: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.user = null;
      state.message = action.payload;
    },
    logoutUserRequest: (state, action) => {
      state.loading = true;
    },
    logoutUserSuccess: (state, action) => {
      state.loading = false;
      state.user = null;
      state.message = action.payload;
    },
    logoutUserFailure: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    sendEmailRequest: (state, action) => {
      state.loading = true;
    },
    sendEmailSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    sendEmailFailure: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    clearMessage: (state, action) => {
      state.loading = false;
      state.message = null;
    },
  },
});

export const {
  loginRequest,
  loginSuccess,
  loginFailure,
  clearMessage,
  sendEmailRequest,
  logoutUserRequest,
  logoutUserSuccess,
  logoutUserFailure,
  sendEmailSuccess,
  sendEmailFailure,
} = authSlice.actions;

export default authSlice.reducer;
