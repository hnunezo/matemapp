import React from "react";
import { Formik, Form } from "formik";
import StyledButton from "../stateless/StyledButton";
import usersService from "../../services/users";
import * as Yup from "yup";
import { useState } from "react";
import FormInput from "./FormInput";

const RegisterFormFormik = () => {
  console.log("formik");
  const [registered, setRegistered] = useState(false);

  const register = (values) => {
    console.log(values, "values");
    usersService.registerUser(values).then((res) => setRegistered(true));
  };

  return (
    <div
      style={{
        height: "70vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      {registered === false ? (
        <Formik
          initialValues={{
            username: "",
            password: "",
            fname: "",
            lname: "",
            email: "",
          }}
          onSubmit={register}
          validationSchema={Yup.object().shape({
            username: Yup.string()
              .min(3, "3 characters at least")
              .max(25, "25 characters maximum")
              .required("Required"),
            password: Yup.string()
              .min(3, "3 characters at least")
              .max(25, "25 characters maximum")
              .required("Required"),
            fname: Yup.string()
              .min(3, "3 characters at least")
              .max(25, "25 characters maximum")
              .required("Required"),
            lname: Yup.string()
              .min(3, "3 characters at least")
              .max(25, "25 characters maximum")
              .required("Required"),
            email: Yup.string()
              .min(3, "3 characters at least")
              .email("Invalid email")
              .required("Required"),
          })}
        >
          <Form className="mt-5 d-flex flex-column align-items-center justify-content-center gap-5">
            <h1>Register</h1>
            <div className="d-flex gap-5">
              <FormInput name="username" placeholder="Username" />
              <FormInput
                name="password"
                type="password"
                placeholder="Password"
              />
            </div>
            <div className="d-flex gap-5">
              <FormInput name="fname" placeholder="Name" />
              <FormInput name="lname" placeholder="Last Name" />
            </div>
            <FormInput name="email" placeholder="Email" />
            <StyledButton type="submit">Register!!</StyledButton>
          </Form>
        </Formik>
      ) : (
        <h2>Registered!! Go to login</h2>
      )}
    </div>
  );
};

export default RegisterFormFormik;
