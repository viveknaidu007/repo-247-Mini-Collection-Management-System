import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const authSlice = createSlice({
  name: "auth",
  initialState: { user: null, token: null },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setUser, logout } = authSlice.actions;

export const login = (username, password) => async (dispatch) => {
  const res = await axios.post(`${API_URL}/login`, { username, password });
  dispatch(setUser(res.data));
};

export const register = (username, password) => async () => {
  await axios.post(`${API_URL}/register`, { username, password });
};

export default authSlice.reducer;
