import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import PropTypes from "prop-types";

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

function RegisterTab({ setUser }) {
  const [regUsername, setRegUserName] = useState();
  const [regPassword, setRegPassword] = useState();
  const [regConfirmPassword, setRegConfirmPassword] = useState();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const user = await registerUser({
        regUsername,
        regPassword,
        regConfirmPassword,
      });
      setUser(user);
    } catch (error) {
      return;
    }
  };

  return (
    <>
      <h3 className="mb-2">Register</h3>
      <p className="text-white-50 mb-2">
        Please enter your email and password!
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

        <Form.Label style={{ marginLeft: "3px" }}>Confirm Password</Form.Label>
        <Form.Control
          type="password"
          id="confirmPassword"
          onChange={(e) => setRegConfirmPassword(e.target.value)}
          className="mb-4"
        />

        <Button
          type="submit"
          variant="outline-secondary"
          size="lg"
          style={{ width: "300px", position: "absolute", bottom: "50px" }}
        >
          Register
        </Button>
      </Form>
    </>
  );
}

RegisterTab.propTypes = {
  setUser: PropTypes.func.isRequired,
};

export default RegisterTab;
