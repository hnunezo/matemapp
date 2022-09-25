import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    name: "",
  },
  reducers: {
    registerUser: (state, action) => {
      state.name = action.payload;
    },
  },
});

export const { registerUser } = userSlice.actions;

export default userSlice.reducer;
