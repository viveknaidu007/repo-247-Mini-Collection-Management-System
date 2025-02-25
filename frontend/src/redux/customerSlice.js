import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const customerSlice = createSlice({
  name: "customer",
  initialState: { customers: [] },
  reducers: {
    setCustomers: (state, action) => {
      state.customers = action.payload;
    },
  },
});

export const { setCustomers } = customerSlice.actions;

export const fetchCustomers = () => async (dispatch) => {
  const res = await axios.get(`${API_URL}/customers`);
  dispatch(setCustomers(res.data));
};

export default customerSlice.reducer;
