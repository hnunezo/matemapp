import React, { useEffect } from "react";
import UserForm from "../UserForm/UserForm";
import { resetUser } from "../../features/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import "./home.css";
import { reset } from "../../features/exercises/exercisesSlice";

const Home = () => {
  const dispatch = useDispatch();
  const againState = useSelector((state) => state.page.again);
  useEffect(() => {
    if (againState === false) {
      dispatch(resetUser());
    }
    dispatch(reset());
  }, []); // eslint-disable-line
  return (
    <div className={"container-home"}>
      <h1>
        Welcome to{" "}
        <img
          src={require("../../assets/logo.png")}
          style={{ width: "13rem" }}
          alt="logo"
        />
      </h1>
      <p className="text-muted lead text-center">
        A simple math-quiz app for exercises your logical skills.
      </p>
      <UserForm />
    </div>
  );
};

export default Home;
