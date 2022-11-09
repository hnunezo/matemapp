import { useState } from "react";
import { useDispatch, useSelector } from "react-redux/es/exports";
import { createExercises } from "../../features/exercises/exercisesSlice";
import { useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";
import { animated, useTransition } from "react-spring";
import { useEffect } from "react";
import "./userform.css";
import StyledButton from "../stateless/StyledButton";
import RequiredMark from "../stateless/RequiredMark";
import { isLoading } from "../../features/page/pageSlice";
import examsSevice from "../../services/exams";

const UserForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const [typeIsVisible, setTypeVisible] = useState(true);
  const [amountIsVisible, setAmountVisible] = useState(true);
  const [requirementIsVisible, setRequirementVisible] = useState(true);
  const [type, setType] = useState("");
  const [amount, setAmount] = useState("");
  const [requirement, setRequirement] = useState("");

  //DEFINE TRANSITIONS DEPENDENCIES

  const transitionRequirement = useTransition(requirementIsVisible, {
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

  // SET INPUTS VISIBLES
  useEffect(() => {
    if (type !== "") setTypeVisible(false);
  }, [type]);
  useEffect(() => {
    if (amount !== "") setAmountVisible(false);
  }, [amount]);
  useEffect(() => {
    if (requirement !== "") setRequirementVisible(false);
  }, [requirement]);

  //CREATE EXERCISES FUNCTION
  const handleCreateExercise = () => {
    let exercisesToAdd = [];
    const operationArr = ["+", "-", "/", "*"];
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
      if (type === "/" || type === "*" || type === "mix") {
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
      if (type !== "mix") {
        exercise = {
          id: i + 1,
          firstNumber: firstNumber,
          secondNumber: secondNumber,
          // eslint-disable-next-line no-eval
          result: eval(firstNumber + type + secondNumber),
          userResult: 0,
          operation: type,
        };
      } else {
        let selectedOperation =
          operationArr[Math.floor(Math.random() * (3 - 0 + 1) + 0)];
        exercise = {
          id: i + 1,
          firstNumber: firstNumber,
          secondNumber: secondNumber,
          // eslint-disable-next-line no-eval
          result: eval(firstNumber + selectedOperation + secondNumber),
          userResult: 0,
          operation: selectedOperation,
        };
      }
      exercisesToAdd.push(exercise);
    }

    user.token
      ? examsSevice
          .postExam(
            {
              type,
              requirement: requirement ? requirement : 0.6,
              grade: "",
              questions: exercisesToAdd,
            },
            `Bearer ${user.token}`
          )
          .then((res) =>
            dispatch(
              createExercises({
                id: res.id,
                type: res.type,
                amount: res.questions.length,
                exercises: res.questions,
                requirement: res.requirement,
              })
            )
          )
      : dispatch(
          createExercises({
            type,
            requirement: requirement ? requirement : 0.6,
            grade: "",
            exercises: exercisesToAdd,
          })
        );
    dispatch(isLoading());
    navigate("/exercises");
  };
  return (
    <div className="container-form">
      <StyledButton
        onClick={() => handleCreateExercise()}
        disabled={
          amount !== "" && type !== "" && user.name !== "" ? false : true
        }
        style={{
          alignSelf: "center",
        }}
        className="mt-3 w-100"
      >
        Create Exercises
      </StyledButton>

      {transitionType((style, item) =>
        item ? (
          <animated.div style={style} className="item">
            <Form.Group className="form-field">
              <Form.Label>
                Select type of exercises
                <RequiredMark />
              </Form.Label>
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
            <Form.Group className="form-field">
              <Form.Label>
                Choose amount of exercises
                <RequiredMark />
              </Form.Label>
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
      {transitionRequirement((style, item) =>
        item ? (
          <animated.div style={style} className="item mb-5">
            <Form.Group className="form-field">
              <Form.Label>
                Choose the requirement to aprove{" "}
                <span style={{ color: "red" }}>{`(Default 60%)`}</span>
              </Form.Label>
              <Form.Select
                value={requirement}
                onChange={(e) => setRequirement(e.target.value)}
              >
                <option value={""}>------Select-----</option>
                <option value={0.5}>50%</option>
                <option value={0.6}>60%</option>
                <option value={0.7}>70%</option>
                <option value={0.8}>80%</option>
              </Form.Select>
            </Form.Group>
          </animated.div>
        ) : null
      )}
    </div>
  );
};

export default UserForm;
