import { createSlice } from "@reduxjs/toolkit";
const userLogged = window.localStorage.getItem("MathAppToken");
let initialState = {
  user: "",
  token: "",
};

if (userLogged) {
  const userWithToken = JSON.parse(userLogged);
  initialState = {
    user: userWithToken.user,
    token: userWithToken.token,
  };
}

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
    resetUser: (state) => {
      state = {
        user: "",
        token: "",
      };
    },
  },
});

export const { login, resetUser, setToken } = userSlice.actions;

export default userSlice.reducer;
