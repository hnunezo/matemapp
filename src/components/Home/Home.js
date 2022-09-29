import React from "react";
import UserForm from "../UserForm/UserForm";
import { resetUser } from "../../features/user/userSlice";
import { useDispatch } from "react-redux";
import "./home.css";

const Home = () => {
  const dispatch = useDispatch();
  dispatch(resetUser());
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
