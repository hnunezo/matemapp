import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "",
  type: "",
  amount: 0,
  exercises: [],
  correct: 0,
  requirement: 0.6,
};

export const exerciseSlice = createSlice({
  name: "exercises",
  initialState,
  reducers: {
    createExercises: (state, action) => {
      state.id = action.payload.id;
      state.type = action.payload.type;
      state.amount = action.payload.amount;
      state.exercises = action.payload.exercises;
      state.requirement = action.payload.requirement;
    },
    answerExercise: (state, action) => {
      state.exercises[action.payload.index - 1].userResult =
        action.payload.answer;
    },
    addCorrect: (state) => {
      state.correct += 1;
    },
    reset: () => initialState,
  },
});

export const { answerExercise, addCorrect, createExercises, reset } =
  exerciseSlice.actions;

export default exerciseSlice.reducer;
