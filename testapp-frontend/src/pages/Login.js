import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import PropTypes from "prop-types";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Image from "react-bootstrap/Image";

async function loginUser(credentials) {
  try {
    const response = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
        console.log(response);
      throw new Error(response);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fehler beim Login: " + error.message);
    throw error;
  }
}

async function registerUser(credentials) {
  try {
    const response = await fetch("http://localhost:3000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      throw new Error(response);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fehler beim Registrieren: " + error.message);
    throw error;
  }
}

function Login({ setToken }) {
  const [logUsername, setLogUserName] = useState();
  const [logPassword, setLogPassword] = useState();
  const [regUsername, setRegUserName] = useState();
  const [regPassword, setRegPassword] = useState();
  const [regConfirmPassword, setRegConfirmPassword] = useState();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const token = await loginUser({
        logUsername,
        logPassword,
      });
      setToken(token);
    } catch (error) {
      return;
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const token = await registerUser({
        regUsername,
        regPassword,
        regConfirmPassword,
      });
      setToken(token);
    } catch (error) {
      return;
    }
  };

  return (
    <Card
      className="my-5 mx-auto"
      style={{ borderRadius: "1rem", maxWidth: "400px", height: "500px" }}
    >
      <Card.Body className="p-0 d-flex flex-column align-items-center">
        <Tabs
          id="formTabs"
          defaultActiveKey={"login"}
          className="mb-4"
          fill
          style={{ width: "400px" }}
        >
          <Tab
            key="login"
            eventKey="login"
            title={
              <>
                <Image src="../img/login.png" style={{ width: "39px" }} />
              </>
            }
          >
            <h3 className="mb-2">Login</h3>
            <p className="text-white-50 mb-5">
              Please enter your login and password!
            </p>

            <Form onSubmit={handleLogin} style={{ width: "300px" }}>
              <Form.Label style={{ marginLeft: "3px" }}>Username</Form.Label>
              <Form.Control
                type="text"
                id="loginUsername"
                onChange={(e) => setLogUserName(e.target.value)}
                className="mb-3"
              />

              <Form.Label style={{ marginLeft: "3px" }}>Password</Form.Label>
              <Form.Control
                type="password"
                id="loginPassword"
                onChange={(e) => setLogPassword(e.target.value)}
                className="mb-1"
              />

              <p className="small mb-5" style={{ marginLeft: "4px" }}>
                <a href="#!">Forgot password?</a>
              </p>
              <Button
                type="submit"
                className="w-100"
                variant="outline-secondary"
                size="lg"
              >
                Login
              </Button>
            </Form>
          </Tab>
          <Tab
            key="register"
            eventKey="register"
            title={
              <>
                <Image
                  src="../img/registration.png"
                  style={{ width: "40px" }}
                />
              </>
            }
          >
            <h3 className="mb-2">Register</h3>
            <p className="text-white-50 mb-3">
              Please enter your Username and password!
            </p>

            <Form onSubmit={handleRegister} style={{ width: "300px" }}>
              <Form.Label style={{ marginLeft: "3px" }}>Username</Form.Label>
              <Form.Control
                type="text"
                id="registerUsername"
                onChange={(e) => setRegUserName(e.target.value)}
                className="mb-3"
              />

              <Form.Label style={{ marginLeft: "3px" }}>Password</Form.Label>
              <Form.Control
                type="password"
                id="registerPassword"
                onChange={(e) => setRegPassword(e.target.value)}
                className="mb-3"
              />

              <Form.Label style={{ marginLeft: "3px" }}>
                Confirm Password
              </Form.Label>
              <Form.Control
                type="password"
                id="confirmPassword"
                onChange={(e) => setRegConfirmPassword(e.target.value)}
                className="mb-4"
              />

              <Button
                type="submit"
                className="w-100"
                variant="outline-secondary"
                size="lg"
              >
                Register
              </Button>
            </Form>
          </Tab>
        </Tabs>
      </Card.Body>
    </Card>
  );
}

export default Login;

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};
