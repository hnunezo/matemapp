import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { isLoading } from "../../features/page/pageSlice";

const Navigation = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const goHome = () => {
    dispatch(isLoading());
    navigate("/");
  };

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand onClick={() => goHome()}>
          <img
            src={require("../../assets/logo.png")}
            alt={"Home"}
            style={{ width: "11rem" }}
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="#home">GIT</Nav.Link>
            <Nav.Link href="#link">Linkedin</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
