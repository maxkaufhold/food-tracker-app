import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import Routing from "./pages/Routing";
import Login from "./pages/Login";
import NavbarDesktop from "./pages/NavbarDesktop";
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
          <div>
            <NavbarDesktop group={group} setGroup={setGroup}/>
          </div>
          <Routing group={group}/>
        </BrowserRouter>
      </Container>
    </React.StrictMode>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
