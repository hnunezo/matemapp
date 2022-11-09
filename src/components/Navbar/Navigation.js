import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { isLoading } from "../../features/page/pageSlice";
import { resetUser, setToken } from "../../features/user/userSlice";
import "./navigation.css";

const Navigation = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token);

  const goHome = () => {
    dispatch(isLoading());
    navigate(token ? "/home" : "/");
  };
  const goRegister = () => {
    dispatch(isLoading());
    navigate("/register");
  };

  const logOut = () => {
    window.localStorage.removeItem("MathAppToken");
    dispatch(setToken(""));
    dispatch(resetUser());
    dispatch(isLoading());
    navigate("/");
  };

  const goLogin = () => {
    dispatch(isLoading());
    navigate("/login");
  };

  return (
    <Navbar
      bg="black"
      expand="lg"
      variant="dark"
      style={{ height: "10%", padding: 0 }}
    >
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
          <Nav className="ms-auto">
            {token ? (
              <Nav.Link
                onClick={() => logOut()}
                className="text-light link-nav"
              >
                Log Out
              </Nav.Link>
            ) : (
              <>
                <Nav.Link
                  onClick={() => goLogin()}
                  className="text-light link-nav"
                >
                  Login
                </Nav.Link>
                <Nav.Link
                  onClick={() => goRegister()}
                  className="text-light link-nav"
                >
                  Register
                </Nav.Link>
              </>
            )}
            <Nav.Link
              href="https://github.com/hnunezo/matemapp"
              target={"_blank"}
              className="text-light link-nav"
            >
              GIT
            </Nav.Link>
            <Nav.Link
              href="https://www.linkedin.com/in/hector-nuñez-oviedo-a054171a7/"
              target={"_blank"}
              className="text-light link-nav"
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
