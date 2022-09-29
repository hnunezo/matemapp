import React from "react";
import { useSelector } from "react-redux";
import { CanvasJSChart } from "canvasjs-react-charts";
import { Table } from "react-bootstrap";
import "./results.css";

const Results = () => {
  const exercises = useSelector((state) => state.exercises);
  const correctas = useSelector((state) => state.exercises.correct);
  const requirement = Number(
    useSelector((state) => state.exercises.requirement)
  );

  const options = {
    animationEnabled: true,
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
            numbers: (100 * correctas) / exercises.exercises.length,
          },
          {
            y: exercises.exercises.length - correctas,
            label: "Incorrect",
            numbers:
              ((exercises.exercises.length - correctas) * 100) /
              exercises.exercises.length,
          },
        ],
      },
    ],
  };
  const formulaPrueba = () => {
    if (requirement * exercises.exercises.length > correctas) {
      return (
        (4 - 1) * (correctas / (requirement * exercises.exercises.length)) + 1
      );
    } else {
      return (
        ((7 - 4) * (correctas - requirement * exercises.exercises.length)) /
          (exercises.exercises.length * (1 - requirement)) +
        4
      );
    }
  };

  return (
    <div style={{ textAlign: "center", width: "100%" }}>
      <h2 className="h1">Summary</h2>
      <div style={{ display: "flex", marginTop: "5rem" }}>
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
        <div
          style={{ width: "100%", display: "flex", flexDirection: "column" }}
        >
          <CanvasJSChart options={options} />
          <h2>
            {" "}
            {correctas} / {exercises.exercises.length} Points
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
        </div>
      </div>
    </div>
  );
};

export default Results;
