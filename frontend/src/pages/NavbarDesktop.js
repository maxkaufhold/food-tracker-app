import React, { useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import CloseButton from 'react-bootstrap/CloseButton';
import Form from 'react-bootstrap/Form';

function NavbarDesktop() {
  const [showOffcanvas, setShowOffcanvas] = useState(false);

  const handleClose = () => setShowOffcanvas(false);
  const handleThemeSwitch = () => {
    document.body.dataset.bsTheme = document.body.dataset.bsTheme === 'light' ? 'dark' : 'light';
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
