import UserForm from "./components/UserForm/UserForm";
import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import Results from "./components/Results/Results";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import Home from "./components/Home/Home";
import Navigation from "./components/Navbar/Navigation";
import Exercises from "./components/Exercises/Exercises";

const App = () => {
  const exercises = useSelector((state) => state.exercises.exercises);
  return (
    <div>
      <Navigation />
      <Container className="d-flex flex-column align-items-center mt-5">
        <Routes>
          <Route index path="/" element={<Home />} />
          <Route path="/quick" element={<UserForm />} />
          <Route
            path="/exercises"
            element={<Exercises exercises={exercises} />}
          />
          <Route path="/results" element={<Results />} />
        </Routes>
      </Container>
    </div>
  );
};

export default App;
