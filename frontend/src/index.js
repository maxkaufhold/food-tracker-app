import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import NavbarDesktop from "./pages/NavbarDesktop";
import Routing from "./pages/Routing";
import useUser from "./useUser";
import Container from "react-bootstrap/Container";
// Importing the Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";

export default function App() {
  const { user, setUser } = useUser();

  if (!user || !user.token) {
    return <Login setUser={setUser} />;
  }

  return (
    <React.StrictMode>
      <Container fluid>
        <BrowserRouter>
          <div>
            <NavbarDesktop />
          </div>
          <Routing />
        </BrowserRouter>
      </Container>
    </React.StrictMode>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
