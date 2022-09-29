import UserForm from "./components/UserForm/UserForm";
import { Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Results from "./components/Results/Results";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import Home from "./components/Home/Home";
import Navigation from "./components/Navbar/Navigation";
import Exercises from "./components/Exercises/Exercises";
import LoadingSpinner from "./components/LoadingSpinner/LoadingSpinner";
import { useEffect } from "react";
import { isNot } from "./features/page/pageSlice";

const App = () => {
  const exercises = useSelector((state) => state.exercises.exercises);
  const loading = useSelector((state) => state.page.loading);
  const dispatch = useDispatch();

  useEffect(() => {
    if (loading) {
      setTimeout(() => {
        dispatch(isNot());
      }, 1800);
    }
  }, [loading]); // eslint-disable-line
  return (
    <div>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
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
        </>
      )}
    </div>
  );
};

export default App;
