import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import StyledButton from "../stateless/StyledButton";
import loginService from "../../services/login";
import { useDispatch } from "react-redux";
import { login, setToken } from "../../features/user/userSlice";
import { useNavigate } from "react-router-dom";
import { isLoading } from "../../features/page/pageSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (message !== "") {
      setTimeout(() => {
        setMessage("");
      }, 3000);
    }
  }, [message]);

  const goHome = () => {
    dispatch(isLoading());
    navigate("/home");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginService.login(form);
      dispatch(login(response.user));
      dispatch(setToken(response.token));
      window.localStorage.setItem(
        "MathAppToken",
        JSON.stringify({ user: response.user, token: response.token })
      );
      goHome();
    } catch (err) {
      setMessage("Wrong Credentials");
    }
  };
  return (
    <div
      style={{ height: "70vh" }}
      className={"d-flex flex-column justify-content-center"}
    >
      <h1>Login</h1>

      <Form className="mt-5">
        <Form.Group className="d-flex flex-column align-items-center">
          <input
            name="email"
            placeholder="Email..."
            value={form.email}
            onChange={(e) =>
              setForm((prev) => {
                return {
                  ...prev,
                  email: e.target.value,
                };
              })
            }
          />
          <input
            name="password"
            placeholder="Password..."
            type="password"
            value={form.password}
            onChange={(e) =>
              setForm((prev) => {
                return {
                  ...prev,
                  password: e.target.value,
                };
              })
            }
            className="mt-3"
          />
          <div
            style={{ position: "relative", width: "15rem" }}
            className="d-flex flex-column align-items-center"
          >
            <StyledButton onClick={handleSubmit} className="mt-4">
              Login
            </StyledButton>
            <span style={{ position: "absolute", top: "5rem", color: "red" }}>
              {message}
            </span>
          </div>
        </Form.Group>
      </Form>
    </div>
  );
};

export default Login;
