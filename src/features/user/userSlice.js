import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    registerUser: (state, action) => {
      state.name = action.payload;
    },
    resetUser: () => initialState,
  },
});

export const { registerUser, resetUser } = userSlice.actions;

export default userSlice.reducer;
