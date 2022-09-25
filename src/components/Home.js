import React from "react";

import UserForm from "./UserForm";

const Home = () => {
  return (
    <div>
      <h1>Welcome to MatemApp</h1>
      <p className="text-muted lead text-center">
        A simple math-quiz app for exercises your logical skills.
      </p>
      <UserForm />
    </div>
  );
};

export default Home;
