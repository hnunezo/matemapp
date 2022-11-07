import React, { useState } from "react";
import UserForm from "../UserForm/UserForm";
import { useSelector } from "react-redux";
import "./home.css";
import StyledButton from "../stateless/StyledButton";

const Home = () => {
  const user = useSelector((state) => state.user.user);
  const [newExam, setNewExam] = useState(false);

  return (
    <div className={"container-home"}>
      <h1>
        Welcome {user ? user.username : "Anon"} to{" "}
        <img
          src={require("../../assets/logo.png")}
          style={{ width: "13rem" }}
          alt="logo"
        />
      </h1>
      <StyledButton onClick={() => setNewExam(!newExam)}>New Exam</StyledButton>
      {newExam ? <UserForm /> : null}
    </div>
  );
};

export default Home;
