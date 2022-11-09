import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { CanvasJSChart } from "canvasjs-react-charts";
import { Table } from "react-bootstrap";
import "./results.css";
import StyledButton from "../stateless/StyledButton";
import { useNavigate } from "react-router-dom";
import { isLoading } from "../../features/page/pageSlice";
import examsService from "../../services/exams";
const Results = () => {
  const exercises = useSelector((state) => state.exercises);
  const amount = useSelector((state) => state.exercises.exercises.length);
  const correctas = useSelector((state) => state.exercises.correct);
  const requirement = Number(
    useSelector((state) => state.exercises.requirement)
  );
  const token = useSelector((state) => state.user.token);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const options = {
    animationEnabled: true,
    height: 200,
    exportEnabled: true,
    theme: "light1", // "light1", "dark1", "dark2"
    data: [
      {
        type: "pie",
        indexLabel: "{label}: {numbers}%",
        startAngle: -90,
        dataPoints: [
          {
            y: correctas,
            label: "Correct",
            numbers: (100 * correctas) / amount,
          },
          {
            y: amount - correctas,
            label: "Incorrect",
            numbers: ((amount - correctas) * 100) / amount,
          },
        ],
      },
    ],
  };
  const formulaPrueba = () => {
    if (token) {
      if (correctas < requirement * amount) {
        examsService
          .answerExam(
            exercises.id,
            {
              questions: exercises.exercises,
              grade: (4 - 1) * (correctas / (requirement * amount)) + 1,
            },
            `Bearer ${token}`
          )
          .then((res) => console.log(res));
        return (4 - 1) * (correctas / (requirement * amount)) + 1;
      } else {
        examsService
          .answerExam(
            exercises.id,
            {
              questions: exercises.exercises,
              grade:
                ((7 - 4) * (correctas - requirement * amount)) /
                  (amount * (1 - requirement)) +
                4,
            },
            `Bearer ${token}`
          )
          .then((res) => console.log(res));
        return (
          ((7 - 4) * (correctas - requirement * amount)) /
            (amount * (1 - requirement)) +
          4
        );
      }
    } else {
      if (correctas < requirement * amount) {
        return (4 - 1) * (correctas / (requirement * amount)) + 1;
      } else {
        return (
          ((7 - 4) * (correctas - requirement * amount)) /
            (amount * (1 - requirement)) +
          4
        );
      }
    }
  };
  const goHome = () => {
    dispatch(isLoading());
    navigate("/home");
  };

  return (
    <div style={{ textAlign: "center", width: "100%" }}>
      <h1>Summary</h1>
      <div className="summary">
        <Table className="custom-table">
          <thead>
            <tr>
              <th>id</th>
              <th>Exercise</th>
              <th>Result</th>
              <th>Your Answer</th>
            </tr>
          </thead>
          <tbody>
            {exercises.exercises.map((ex) => {
              return (
                <tr
                  key={ex.id}
                  style={
                    Number(ex.result) === Number(ex.userResult)
                      ? {
                          backgroundColor: "#4f81bc",
                        }
                      : {
                          backgroundColor: "#c0504e",
                        }
                  }
                >
                  <th>{ex.id}</th>
                  <th>
                    {ex.firstNumber} {ex.operation} {ex.secondNumber}
                  </th>
                  <th>{ex.result}</th>
                  <th>{ex.userResult}</th>
                </tr>
              );
            })}
          </tbody>
        </Table>
        <div className="container-chart">
          <div style={{ height: "220px" }}>
            <CanvasJSChart options={options} />
          </div>

          <h2>
            {" "}
            {correctas} / {amount} Points
          </h2>
          <div className="d-flex justify-content-end align-items-center">
            <h2>Your Grade:</h2>
            <div>
              <h2
                style={{
                  padding: "2rem 3rem",
                  border: "4px solid black",
                  marginLeft: "1rem",
                  fontWeight: "bolder",
                }}
              >
                {formulaPrueba().toFixed(1)}
              </h2>
            </div>
          </div>
          <StyledButton
            className="m-2 p-3 w-100 d-flex align-items-center justify-content-center"
            onClick={() => goHome()}
          >
            Try Again!!
          </StyledButton>
        </div>
      </div>
    </div>
  );
};

export default Results;
