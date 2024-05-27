import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";

function ThemeSwitch() {
  const [theme, setTheme] = useState(document.body.dataset.bsTheme);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      setTheme(storedTheme);
      document.body.dataset.bsTheme = storedTheme;
    }
  }, []);

  const handleThemeSwitch = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.body.dataset.bsTheme = newTheme;
  };

  return (
    <>
      <Form>
        <Form.Check
          type="switch"
          id="theme-switch"
          onChange={handleThemeSwitch}
          checked={theme === "dark"}
        />
      </Form>
    </>
  );
}

export default ThemeSwitch;
