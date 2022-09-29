import { configureStore } from "@reduxjs/toolkit";
import exerciseReducer from "../features/exercises/exercisesSlice";
import userReducer from "../features/user/userSlice";
import pageReducer from "../features/page/pageSlice";

export default configureStore({
  reducer: {
    exercises: exerciseReducer,
    user: userReducer,
    page: pageReducer,
  },
});
