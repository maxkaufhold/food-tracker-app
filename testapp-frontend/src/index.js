import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import Login from "./pages/Login";
import NavbarMobile from "./pages/NavbarMobile";
import NavbarDesktop from "./pages/NavbarDesktop";
import Routing from "./pages/Routing";
import useToken from './useToken';
import Container from 'react-bootstrap/Container';
// Importing the Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';

export default function App() {
  const { token, setToken } = useToken();

  if(!token) {
    return <Login setToken={setToken} />
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
      </ Container>
    </React.StrictMode>
  );
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);