import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form } from "react-bootstrap";
import {
  addCorrect,
  answerExercise,
} from "../features/exercises/exercisesSlice";

const Exercise = ({ ex }) => {
  const navigate = useNavigate();
  const [userAnswer, setUserAnswer] = useState("");
  const [message, setMessage] = useState("Write your answer");

  const limit = useSelector((state) => state.exercises.amount);
  const dispatch = useDispatch();

  const nextEx = () => {
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
      if (Number(ex.id) < Number(limit)) {
        navigate(`/exercise/${Number(ex.id) + 1}`);
      } else {
        navigate(`/results`);
      }
    } else {
      setMessage("invalidate!!");
    }
  };

  return (
    <div className="container-general">
      <h1>Exercise {ex.id}</h1>
      <p className="lead">
        {ex.firstNumber} {ex.operation} {ex.secondNumber} = ?
      </p>
      <Form.Group>
        <Form.Control
          name="userAnswer"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
        />
        <Form.Text
          className={message === "invalidate!!" ? "text-danger" : null}
        >
          {message}
        </Form.Text>
      </Form.Group>
      <Button className="btn btn-success my-4" onClick={() => nextEx()}>
        Next
      </Button>
    </div>
  );
};

export default Exercise;
