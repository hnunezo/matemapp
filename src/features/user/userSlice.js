import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: "",
  token: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    resetUser: () => initialState,
  },
});

export const { login, resetUser, setToken } = userSlice.actions;

export default userSlice.reducer;
