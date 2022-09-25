import { useState } from "react";
import { useDispatch, useSelector } from "react-redux/es/exports";
import { registerUser } from "../features/user/userSlice";
import { createExercises } from "../features/exercises/exercisesSlice";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import "../index.css";
import { animated, useTransition } from "react-spring";
import { useEffect } from "react";
import { useRef } from "react";

const UserForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const [nameIsVisible, setNameVisible] = useState(true);
  const [typeIsVisible, setTypeVisible] = useState(true);
  const [amountIsVisible, setAmountVisible] = useState(true);
  const nameInput = useRef(null);
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [amount, setAmount] = useState("");

  //DEFINE TRANSITIONS DEPENDENCIES
  const transitionName = useTransition(nameIsVisible, {
    from: { x: -100, y: 800, opacity: 0 },
    enter: { x: 0, y: 0, opacity: 1 },
    leave: { x: -100, y: 800, opacity: 0 },
  });
  const transitionType = useTransition(typeIsVisible, {
    from: { x: -100, y: 800, opacity: 0 },
    enter: { x: 0, y: 0, opacity: 1 },
    leave: { x: -100, y: 800, opacity: 0 },
  });
  const transitionAmount = useTransition(amountIsVisible, {
    from: { x: -100, y: 800, opacity: 0 },
    enter: { x: 0, y: 0, opacity: 1 },
    leave: { x: -100, y: 800, opacity: 0 },
  });

  useEffect(() => {
    const keyDownHandler = (event) => {
      if (
        event.key === "Enter" &&
        document.activeElement.name === nameInput.current.name
      ) {
        event.preventDefault();
        dispatch(registerUser(name));
      }
    };

    document.addEventListener("keydown", keyDownHandler);

    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, [name]); // eslint-disable-line

  // SET INPUTS VISIBLES
  useEffect(() => {
    if (user.name !== "") setNameVisible(false);
  }, [name, user.name]);
  useEffect(() => {
    if (type !== "") setTypeVisible(false);
  }, [type]);
  useEffect(() => {
    if (amount !== "") setAmountVisible(false);
  }, [amount]);

  //CREATE EXERCISES FUNCTION
  const handleCreateExercise = () => {
    let exercisesToAdd = [];
    let exercise = {
      id: 0,
      firstNumber: 0,
      secondNumber: 0,
      result: 0,
      userResult: 0,
      operation: "",
    };
    for (let i = 0; i < amount; i++) {
      let firstNumber = Math.floor(Math.random() * 1000);
      let secondNumber = Math.floor(Math.random() * 100);
      //RESTRICCION PARA QUE NO SEAN NEGATIVOS Y DEN NUMEROS PAR
      if (type === "/" || type === "*") {
        if (firstNumber % secondNumber !== 0) {
          while (
            firstNumber % secondNumber !== 0 ||
            firstNumber < secondNumber ||
            secondNumber < 4
          ) {
            firstNumber = Math.floor(Math.random() * 1000);
            secondNumber = Math.floor(Math.random() * 100);
          }
        }
      }
      exercise = {
        id: i + 1,
        firstNumber: firstNumber,
        secondNumber: secondNumber,
        // eslint-disable-next-line no-eval
        result: eval(firstNumber + type + secondNumber),
        userResult: 0,
        operation: type,
      };
      exercisesToAdd.push(exercise);
    }
    dispatch(
      createExercises({
        type,
        amount,
        exercises: exercisesToAdd,
      })
    );
    navigate("/exercises");
  };
  return (
    <div>
      <Button
        onClick={() => handleCreateExercise()}
        disabled={
          amount !== "" && type !== "" && user.name !== "" ? false : true
        }
      >
        Create Exercises
      </Button>
      {transitionName((style, item) =>
        item ? (
          <animated.div style={style} className="item">
            <Form.Group className="d-flex flex-column align-items-start">
              <Form.Label>Your Name</Form.Label>
              <Form.Control
                ref={nameInput}
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
          </animated.div>
        ) : null
      )}

      {transitionType((style, item) =>
        item ? (
          <animated.div style={style} className="item">
            <Form.Group className="d-flex flex-column align-items-start">
              <Form.Label>Select type of exercises</Form.Label>
              <Form.Select
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <option value={""}>------Select-----</option>
                <option value="+">Addition +</option>
                <option value="-">Subtraction -</option>
                <option value="/">Division /</option>
                <option value="*">Multiplication *</option>
                <option value="mix">Mix + - / *</option>
              </Form.Select>
            </Form.Group>
          </animated.div>
        ) : null
      )}

      {transitionAmount((style, item) =>
        item ? (
          <animated.div style={style} className="item">
            <Form.Group className="d-flex flex-column align-items-start">
              <Form.Label>Choose amount of exercises</Form.Label>
              <Form.Select
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              >
                <option value={""}>------Select-----</option>
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={15}>15</option>
                <option value={20}>20</option>
              </Form.Select>
            </Form.Group>
          </animated.div>
        ) : null
      )}
    </div>
  );
};

export default UserForm;
