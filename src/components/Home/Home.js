import React, { useEffect } from "react";
import UserForm from "../UserForm/UserForm";
import { resetUser } from "../../features/user/userSlice";
import { useDispatch } from "react-redux";
import "./home.css";
import { reset } from "../../features/exercises/exercisesSlice";

const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetUser());
    dispatch(reset());
  }, []); // eslint-disable-line
  return (
    <div className={"container-home"}>
      <h1>Welcome to MatemApp</h1>
      <p className="text-muted lead text-center">
        A simple math-quiz app for exercises your logical skills.
      </p>
      <UserForm />
    </div>
  );
};

export default Home;
