import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Form } from "react-bootstrap";
import {
  addCorrect,
  answerExercise,
} from "../../features/exercises/exercisesSlice";
import { isLoading } from "../../features/page/pageSlice";

import "./opencard.css";
import StyledButton from "../stateless/StyledButton";

const Opencard = ({ ex, index }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [userAnswer, setUserAnswer] = useState("");
  const [message, setMessage] = useState("Write your answer");
  const exercises = useSelector((state) => state.exercises.exercises);
  const dispatch = useDispatch();

  useEffect(() => {
    if (
      exercises.filter((exer) => Number(exer.userResult) === 0).length === 0
    ) {
      dispatch(isLoading());
      navigate(`/results`);
    }
  }, [exercises]); // eslint-disable-line
  const handelAnswer = () => {
    if (/^\d+$/.test(userAnswer)) {
      dispatch(
        answerExercise({
          index: ex.id,
          answer: userAnswer,
        })
      );
      if (Number(userAnswer) === Number(ex.result)) {
        dispatch(addCorrect());
      }
      setMessage("Write your answer");
      setUserAnswer("");

      setOpen(false);
    } else {
      setMessage("Invalid");
    }
  };

  return (
    <div style={{ position: "static", margin: "4rem 8rem" }}>
      <div className="container-card">
        <div className="content">
          <h1>Exercise {ex.id}</h1>
          <p className="lead">
            {ex.firstNumber} {ex.operation} {ex.secondNumber} = ?
          </p>
          <Form.Group className="text-center">
            <Form.Control
              name="userAnswer"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
            />
            <Form.Text className={message === "Invalid" ? "text-danger" : null}>
              {message}
            </Form.Text>
          </Form.Group>
          <StyledButton
            className="btn btn-success my-4"
            onClick={() => handelAnswer()}
          >
            Answer
          </StyledButton>
        </div>
        <div
          className={
            open
              ? "flap2"
              : exercises[index].userResult !== 0
              ? "flapSuccess"
              : "flap"
          }
          onClick={
            exercises[index].userResult !== 0 ? null : () => setOpen(!open)
          }
        ></div>
      </div>
    </div>
  );
};

export default Opencard;
