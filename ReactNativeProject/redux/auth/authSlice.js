import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    avatar: null,
    email: "",
    userId: null,
    login: null,
    stateChange: false,
  },
  reducers: {
    updateUserProfile: (state, { payload }) => ({
      ...state,
      avatar: payload.avatar,
      email: payload.email,
      userId: payload.userId,
      login: payload.login,
    }),
    authStateChange: (state, { payload }) => ({
      ...state,
      stateChange: payload.stateChange,
    }),
    authLogout: (state, { payload }) => ({
      ...state,
      avatar: null,
      email: "",
      userId: null,
      login: null,
      stateChange: false,
    }),
  },
});

export default authSlice;
