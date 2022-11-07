import React from "react";
import StyledButton from "../stateless/StyledButton";
import UserForm from "../UserForm/UserForm";
import examsService from "../../services/exams";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";

const HomeWithUser = () => {
  const user = useSelector((state) => state.user.user);
  const [newExam, setNewExam] = useState(false);
  const [exams, setExams] = useState([""]);
  console.log(exams, "exams");

  useEffect(() => {
    if (user) {
      examsService.getExams(user.id).then((res) => setExams(res));
    }
  }, []); // eslint-disable-line

  return (
    <div className={"container-home"}>
      <h1>
        Welcome {user.username} to{" "}
        <img
          src={require("../../assets/logo.png")}
          style={{ width: "13rem" }}
          alt="logo"
        />
      </h1>
      {exams ? (
        <div>
          <h2>My exams</h2>
          <table style={{ width: "100%" }}>
            <thead>
              <tr>
                <th>Type</th>
                <th>Date</th>
                <th>Requirement</th>
                <th>Grade</th>
                <th>State</th>
              </tr>
            </thead>
            <tbody>
              {exams.map((el) => (
                <tr key={el.id}>
                  <td>{el.type}</td>
                  <td>{el.date}</td>
                  <td>{el.requirement * 100}%</td>
                  <td>{el.grade}</td>
                  <td>{el.grade ? "Complete" : "Incomplete"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
      <StyledButton onClick={() => setNewExam(!newExam)}>New Exam</StyledButton>
      {newExam ? <UserForm /> : null}
    </div>
  );
};

export default HomeWithUser;
