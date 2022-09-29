import { createSlice } from "@reduxjs/toolkit";

export const pageSlice = createSlice({
  name: "page",
  initialState: {
    loading: false,
  },
  reducers: {
    isLoading: (state) => {
      state.loading = true;
    },
    isNot: (state) => {
      state.loading = false;
    },
  },
});

export const { isLoading, isNot } = pageSlice.actions;

export default pageSlice.reducer;
