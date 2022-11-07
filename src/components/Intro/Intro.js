import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { isLoading } from "../../features/page/pageSlice";
import StyledButton from "../stateless/StyledButton";

const Intro = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const goLogin = () => {
    dispatch(isLoading());
    navigate("/login");
  };

  const goHome = () => {
    dispatch(isLoading());
    navigate("/home");
  };
  return (
    <div>
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
      <h2>Log in to practice or continue like anon</h2>
      <div>
        <StyledButton onClick={() => goLogin()}>Log In</StyledButton>
        <StyledButton onClick={() => goHome()}>Anon</StyledButton>
      </div>
    </div>
  );
};

export default Intro;
