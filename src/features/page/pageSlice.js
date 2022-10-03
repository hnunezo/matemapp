import { createSlice } from "@reduxjs/toolkit";

export const pageSlice = createSlice({
  name: "page",
  initialState: {
    loading: false,
    again: false,
  },
  reducers: {
    isLoading: (state) => {
      state.loading = true;
    },
    isNot: (state) => {
      state.loading = false;
    },
    setAgainTrue: (state) => {
      state.again = true;
    },
    setAgainFalse: (state) => {
      state.again = false;
    },
  },
});

export const { isLoading, isNot, setAgainTrue, setAgainFalse } =
  pageSlice.actions;

export default pageSlice.reducer;
