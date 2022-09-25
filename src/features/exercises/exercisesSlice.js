import { createSlice } from "@reduxjs/toolkit";

export const exerciseSlice = createSlice({
  name: "exercises",
  initialState: {
    type: "",
    amount: 0,
    exercises: [],
    correct: 0,
  },
  reducers: {
    createExercises: (state, action) => {
      state.type = action.payload.type;
      state.amount = action.payload.amount;
      state.exercises = action.payload.exercises;
    },
    answerExercise: (state, action) => {
      state.exercises[action.payload.index - 1].userResult =
        action.payload.answer;
    },
    addCorrect: (state) => {
      state.correct += 1;
    },
  },
});

export const { answerExercise, addCorrect, createExercises } =
  exerciseSlice.actions;

export default exerciseSlice.reducer;
