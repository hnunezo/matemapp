import UserForm from "./components/UserForm";
import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import Results from "./components/Results";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import Home from "./components/Home";
import Opencard from "./components/Cards/Opencard";
import Navigation from "./components/Navbar/Navigation";
import Exercises from "./components/Exercises/Exercises";

const App = () => {
  const exercises = useSelector((state) => state.exercises.exercises);
  console.log(exercises, "app");
  return (
    <div className="">
      <Navigation />
      <Container>
        <Routes>
          {/* Setting default Route */}
          <Route index path="/" element={<Home />} />
          <Route path="/quick" element={<UserForm />} />
          <Route
            path="/exercises"
            element={<Exercises exercises={exercises} />}
          />
          {exercises.map((ex) => {
            return (
              <Route
                path={`/exercise/${ex.id}`}
                key={ex.id}
                element={<Opencard ex={ex} />}
              />
            );
          })}
          <Route path="/results" element={<Results />} />
        </Routes>
      </Container>
    </div>
  );
};

export default App;
