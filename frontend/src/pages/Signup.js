import React, { useState, useEffect } from "react";
import { API_URL } from "../Constants";
import Form from "react-bootstrap/Form";
import PropTypes from "prop-types";

async function registerUser(credentials) {
  try {
    const response = await fetch(`${API_URL}/register`, {
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

function Signup({ setUser, submit, setSubmit }) {
  const [regUsername, setRegUserName] = useState();
  const [regPassword, setRegPassword] = useState();
  const [regConfirmPassword, setRegConfirmPassword] = useState();

  useEffect(() => {
    if (submit) {
      const handleSubmit = async () => {
        try {
          const user = await registerUser({
            regUsername,
            regPassword,
            regConfirmPassword,
          });
          console.log(user);
          setUser(user);
        } catch (error) {
          console.error("Registrierung fehlgeschlagen", error);
        } finally {
          setSubmit(false);
        }
      };
      handleSubmit();
    }
  }, [submit]);

  return (
    <>
      <div className="d-flex flex-column align-items-center">
        <p className="text-white-50 mb-4"></p>
        <p className="text-white-50 mb-4"></p>
        <div style={{ width: "80%" }}>
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
        </div>
      </div>
    </>
  );
}

Signup.propTypes = {
  setUser: PropTypes.func.isRequired,
};

export default Signup;
