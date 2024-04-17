import React, { useState } from "react";
import Form from "react-bootstrap/Form";

function ThemeSwitch() {

  const handleThemeSwitch = () => {
    document.body.dataset.bsTheme =
      document.body.dataset.bsTheme === "light" ? "dark" : "light";
  };

  return (
    <>
      <Form>
        <Form.Check
          type="switch"
          id="theme-switch"
          onChange={handleThemeSwitch}
        />
      </Form>
    </>
  );
}

export default ThemeSwitch;
