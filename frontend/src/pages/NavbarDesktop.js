import React, { useState } from 'react';
import axios from 'axios';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import CloseButton from 'react-bootstrap/CloseButton';
import Form from 'react-bootstrap/Form';
import useToken from '../useToken'; // Importieren Sie das useToken Hook

function NavbarDesktop() {
  const { token, removeToken } = useToken(); // Token und removeToken aus dem Hook erhalten
  const [showOffcanvas, setShowOffcanvas] = useState(false);

  const handleClose = () => setShowOffcanvas(false);
  const handleThemeSwitch = () => {
    document.body.dataset.bsTheme = document.body.dataset.bsTheme === 'light' ? 'dark' : 'light';
  };

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:3000/logout", { token: token }); // Senden Sie den POST-Request
      removeToken(); // Entfernen Sie den Token aus dem Session Storage
      window.location.reload(); // Seite automatisch neu laden
    } catch (error) {
      console.error("Fehler beim Logout: " + error.message);
    }
  };

  return (
    <>
      <Navbar key="false" expand="false">
        <Navbar.Toggle 
          aria-controls={`offcanvasNavbar-expand-false`} 
          className="custom-button" 
          onClick={() => setShowOffcanvas(!showOffcanvas)}
        />
        <Form>
          <Form.Check
            type="switch"
            id="theme-switch"
            onChange={handleThemeSwitch}
          />
        </Form>
        <Navbar.Offcanvas
          show={showOffcanvas}
          onHide={handleClose}
          id={`offcanvasNavbar-expand-false`}
          aria-labelledby={`offcanvasNavbarLabel-expand-false`}
          placement="start"
        >
          <Offcanvas.Header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Offcanvas.Title id={`offcanvasNavbarLabel-expand-false`}>
              Auswahl
            </Offcanvas.Title>
            <div>
              <CloseButton onClick={handleClose} className="custom-button" />
            </div>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="flex-column align-items-start">
              <Nav.Link href="/dashboard" >Dashboard</Nav.Link>
              <Nav.Link href="/scan" >Scan</Nav.Link>
              <Nav.Link href="/inventory" >Inventory</Nav.Link>
              <Nav.Link href="/statistics" >Statistics</Nav.Link>
              <Nav.Link href="/list" >Shopping List</Nav.Link>
              <Nav.Link href="/recipes" >Recipes</Nav.Link>
              <Nav.Link href="/profil" >Profil</Nav.Link>
              <Nav.Link onClick={handleLogout}>Logout</Nav.Link> {/* Fügen Sie den onClick-Handler für den Logout hinzu */}
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Navbar>
      <style>
        {`
          .custom-button:focus,.custom-button:active {
            outline: none !important;
            box-shadow: none; 
          }
        `}
      </style>
    </>
  );
}

export default NavbarDesktop;
