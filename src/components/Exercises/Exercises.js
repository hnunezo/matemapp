import React from "react";
import Opencard from "../Cards/Opencard";
import { useSelector } from "react-redux";

const Exercises = ({ exercises }) => {
  const name = useSelector((state) => state.user.name);
  return (
    <div style={{ width: "100%" }}>
      <h1>Welcome {name}</h1>
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
