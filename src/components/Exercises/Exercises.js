import React from "react";
import Opencard from "../Cards/Opencard";

const Exercises = ({ exercises }) => {
  return (
    <div>
      <h1>Exercises</h1>
      <div
        style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
      >
        {exercises.map((ex, i) => (
          <Opencard key={ex.id} ex={ex} index={i} />
        ))}
      </div>
    </div>
  );
};

export default Exercises;
