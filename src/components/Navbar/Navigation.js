import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { isLoading, setAgainFalse } from "../../features/page/pageSlice";
import "./navigation.css";

const Navigation = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const goHome = () => {
    dispatch(setAgainFalse());
    dispatch(isLoading());
    navigate("/");
  };

  return (
    <Navbar bg="black" expand="lg" variant="dark">
      <Container>
        <Navbar.Brand onClick={() => goHome()}>
          <img
            src={require("../../assets/logo.png")}
            alt={"Home"}
            className={"logo"}
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto ">
            <Nav.Link
              href="https://github.com/hnunezo/matemapp"
              target={"_blank"}
              className="text-light"
            >
              GIT
            </Nav.Link>
            <Nav.Link
              href="https://www.linkedin.com/in/hector-nuñez-oviedo-a054171a7/"
              target={"_blank"}
              className="text-light"
            >
              Linkedin
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
