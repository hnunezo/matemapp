import React from "react";
import StyledButton from "../stateless/StyledButton";
import UserForm from "../UserForm/UserForm";
import examsService from "../../services/exams";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  createExercises,
  reset,
} from "../../features/exercises/exercisesSlice";
import { isLoading } from "../../features/page/pageSlice";
import "./home.css";

const HomeWithUser = () => {
  const user = useSelector((state) => state.user.user);
  const [newExam, setNewExam] = useState(false);
  const [exams, setExams] = useState([""]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(reset());
    if (user) {
      examsService.getExams(user.id).then((res) => setExams(res));
    }
  }, []); // eslint-disable-line

  const handleContinue = (el) => {
    dispatch(
      createExercises({
        id: el.id,
        type: el.type,
        amount: el.questions.length,
        exercises: el.questions,
        requirement: el.requirement,
      })
    );
    dispatch(isLoading());
    navigate("/exam/exercises");
  };
  return (
    <div className={"container-home scroll"}>
      <h1>
        Welcome {user.username} to{" "}
        <img
          src={require("../../assets/logo.png")}
          style={{ width: "13rem" }}
          alt="logo"
        />
      </h1>

      <StyledButton onClick={() => setNewExam(!newExam)} className="mb-1">
        {newExam === false ? "New Exam" : "Back"}
      </StyledButton>
      {newExam ? (
        <UserForm />
      ) : exams ? (
        <div className="d-flex flex-column align-items-center">
          <h2>My exams</h2>
          <div>
            <table className={"home-table"}>
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Date</th>
                  <th>Requirement</th>
                  <th>Grade</th>
                  <th>State</th>
                </tr>
              </thead>
            </table>
          </div>
          <div className="scrollable-table">
            <table className="home-table">
              <tbody>
                {exams.map((el, i) => (
                  <tr key={i}>
                    <td>{el.type}</td>
                    <td>{el.date}</td>
                    <td>{el.requirement * 100}%</td>
                    <td>
                      {el.grade === "" ? "?" : Number(el.grade).toFixed(1)}
                    </td>
                    <td>
                      {el.grade ? (
                        "Complete"
                      ) : (
                        <StyledButton onClick={() => handleContinue(el)}>
                          Incomplete
                        </StyledButton>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default HomeWithUser;
