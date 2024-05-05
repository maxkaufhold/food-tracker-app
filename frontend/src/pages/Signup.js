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
      <div className="d-flex flex-column align-items-center">
        <p className="text-white-50 mb-4">
        </p>
        <Form onSubmit={handleRegister} style={{ width: "80%" }}>
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            id="registerUsername"
            onChange={(e) => setRegUserName(e.target.value)}
            className="mb-3"
          />

          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            id="registerPassword"
            onChange={(e) => setRegPassword(e.target.value)}
            className="mb-3"
          />

          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            id="confirmPassword"
            onChange={(e) => setRegConfirmPassword(e.target.value)}
          />

          <Button
            type="submit"
            variant="outline-secondary"
            size="lg"
            style={{ width: "80%", position: "absolute", bottom: "10%" }}
          >
            Register
          </Button>
        </Form>
      </div>
    </>
  );
}

RegisterTab.propTypes = {
  setUser: PropTypes.func.isRequired,
};

export default RegisterTab;
