import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { isLoading } from "../../features/page/pageSlice";
import { login } from "../../features/user/userSlice";
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
    dispatch(login("anon"));
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
      <p className="text-muted lead text-center mt-5">
        A simple math-quiz app for exercises your logical skills.
      </p>
      <h2 className="mt-5">Log in to practice or continue like anon</h2>
      <div className="d-flex justify-content-around mt-5">
        <StyledButton onClick={() => goLogin()}>Log In</StyledButton>
        <StyledButton onClick={() => goHome()}>Anon</StyledButton>
      </div>
    </div>
  );
};

export default Intro;
