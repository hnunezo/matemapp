import { createSlice } from "@reduxjs/toolkit";

export const pageSlice = createSlice({
  name: "page",
  initialState: {
    loading: false,
    again: false,
    actualExam: "",
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
    setExam: (state, action) => {
      state.actualExam = action.payload;
    },
  },
});

export const { isLoading, isNot, setAgainTrue, setAgainFalse, setExam } =
  pageSlice.actions;

export default pageSlice.reducer;
