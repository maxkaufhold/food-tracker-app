import React, { useState } from "react";
import { API_URL } from '../Constants';
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import PropTypes from "prop-types";

async function loginUser(credentials) {
  try {
    const response = await fetch(`${API_URL}/login`, {
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
    console.error("Fehler beim Login: " + error.message);
    throw error;
  }
}

function LoginTab({ setUser }) {
  const [logUsername, setLogUserName] = useState();
  const [logPassword, setLogPassword] = useState();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await loginUser({
        logUsername,
        logPassword,
      });
      setUser(user);
    } catch (error) {
      return;
    }
  };

  return (
    <>
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
          variant="outline-secondary"
          size="lg"
          style={{ width: "300px", position: "absolute", bottom: "10%" }}
        >
          Login
        </Button>
      </Form>
    </>
  );
}

LoginTab.propTypes = {
  setUser: PropTypes.func.isRequired,
};

export default LoginTab;
