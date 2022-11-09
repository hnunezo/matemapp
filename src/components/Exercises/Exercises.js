import React from "react";
import Opencard from "../Cards/Opencard";

const Exercises = ({ exercises }) => {
  return (
    <div style={{ width: "100%" }}>
      <h1>Exercises</h1>
      <p className="text-muted lead text-center">
        I prepared these exercises for you, click on them to open them.
      </p>
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
