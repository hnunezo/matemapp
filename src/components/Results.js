import React from "react";
import { useSelector } from "react-redux";
import { CanvasJSChart } from "canvasjs-react-charts";
import { Table } from "react-bootstrap";

const Results = () => {
  const exercises = useSelector((state) => state.exercises);
  const correctas = useSelector((state) => state.exercises.correct);

  const options = {
    animationEnabled: true,
    exportEnabled: true,
    theme: "light2", // "light1", "dark1", "dark2"
    title: {
      text: "Results",
    },
    data: [
      {
        type: "pie",
        indexLabel: "{label}: {numbers}%",
        startAngle: -90,
        dataPoints: [
          {
            y: correctas,
            label: "Correctas",
            numbers: (100 * correctas) / exercises.exercises.length,
          },
          {
            y: exercises.exercises.length - correctas,
            label: "Incorrectas",
            numbers:
              ((exercises.exercises.length - correctas) * 100) /
              exercises.exercises.length,
          },
        ],
      },
    ],
  };

  return (
    <div style={{ margin: "2rem 2rem" }}>
      <CanvasJSChart options={options} />
      <h2 className="display-5">Resume</h2>
      <Table>
        <thead>
          <tr>
            <th>id</th>
            <th>Exercise</th>
            <th>Result</th>
            <th>Answer</th>
          </tr>
        </thead>
        <tbody>
          {exercises.exercises.map((ex) => {
            return (
              <tr
                key={ex.id}
                style={
                  Number(ex.result) === Number(ex.userResult)
                    ? { backgroundColor: "#70FF8B" }
                    : { backgroundColor: "#FF6961" }
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
    </div>
  );
};

export default Results;
