import React, { useState } from "react";
import { Form } from "react-bootstrap";
import StyledButton from "../stateless/StyledButton";
import usersService from "../../services/users";

const RegisterForm = () => {
  //username, password, fname, lname, email
  const [form, setForm] = useState({
    username: "",
    password: "",
    fname: "",
    lname: "",
    email: "",
  });

  console.log(form, "form");

  const register = (e) => {
    e.preventDefault();
    usersService.registerUser(form).then((res) => console.log(res));
    setForm({
      username: "",
      password: "",
      fname: "",
      lname: "",
      email: "",
    });
  };

  const handleOnChange = (e) => {
    if (e.target.name === "username") {
      setForm((prev) => {
        return {
          ...prev,
          username: e.target.value,
        };
      });
    } else if (e.target.name === "password") {
      setForm((prev) => {
        return {
          ...prev,
          password: e.target.value,
        };
      });
    } else if (e.target.name === "fname") {
      setForm((prev) => {
        return {
          ...prev,
          fname: e.target.value,
        };
      });
    } else if (e.target.name === "lname") {
      setForm((prev) => {
        return {
          ...prev,
          lname: e.target.value,
        };
      });
    } else if (e.target.name === "email") {
      setForm((prev) => {
        return {
          ...prev,
          email: e.target.value,
        };
      });
    }
  };
  return (
    <div>
      <Form>
        <Form.Group>
          <Form.Control
            name="username"
            placeholder="Username..."
            value={form.username}
            onChange={handleOnChange}
          />
          <Form.Control
            name="password"
            type="password"
            placeholder="Password..."
            value={form.password}
            onChange={handleOnChange}
          />
          <Form.Control
            name="fname"
            placeholder="Name..."
            value={form.fname}
            onChange={handleOnChange}
          />
          <Form.Control
            name="lname"
            placeholder="Last Name..."
            value={form.lname}
            onChange={handleOnChange}
          />
          <Form.Control
            name="email"
            placeholder="Email..."
            value={form.email}
            onChange={handleOnChange}
          />
          <StyledButton onClick={register}>Register!!</StyledButton>
        </Form.Group>
      </Form>
    </div>
  );
};

export default RegisterForm;
