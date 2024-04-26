import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import Routing from "./pages/Routing";
import Login from "./pages/Login";
import Navbar from "./pages/Navbar";
import useUser from "./useUser";
import useGroup from "./useGroup";
import Container from "react-bootstrap/Container";
// Importing the Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";

export default function App() {
  const { user, setUser } = useUser();
  const { group, setGroup } = useGroup();

  if (!user) {
    return <Login setUser={setUser} />;
  }

  return (
    <React.StrictMode>
      <Container fluid>
        <BrowserRouter>
          <Navbar group={group} setGroup={setGroup} />
          <Routing group={group ? group.user_group_id : null} />
        </BrowserRouter>
      </Container>
    </React.StrictMode>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
