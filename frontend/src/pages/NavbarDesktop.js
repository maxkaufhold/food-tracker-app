import React, { useState } from "react";
import NavbarUserGroupDropDown from "./NavbarUserGroupDropdown";
import ThemeSwitch from './ThemeSwitch';
import useUser from "../useUser"; // Importieren Sie das useToken Hook
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import CloseButton from "react-bootstrap/CloseButton";

function NavbarDesktop({ group, setGroup }) {
  const { removeUser } = useUser();
  const [showOffcanvas, setShowOffcanvas] = useState(false);

  const handleClose = () => setShowOffcanvas(false);

  return (
    <>
      <Navbar key="false" expand="false">
        <Navbar.Toggle
          aria-controls={`offcanvasNavbar-expand-false`}
          className="custom-button"
          onClick={() => setShowOffcanvas(!showOffcanvas)}
        />
        < NavbarUserGroupDropDown group={group} setGroup={setGroup} />
        < ThemeSwitch />
        <Navbar.Offcanvas
          show={showOffcanvas}
          onHide={handleClose}
          id={`offcanvasNavbar-expand-false`}
          aria-labelledby={`offcanvasNavbarLabel-expand-false`}
          placement="start"
        >
          <Offcanvas.Header
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Offcanvas.Title id={`offcanvasNavbarLabel-expand-false`}>
              Auswahl
            </Offcanvas.Title>
            <div>
              <CloseButton onClick={handleClose} className="custom-button" />
            </div>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="flex-column align-items-start">
              <Nav.Link href="/dashboard">Dashboard</Nav.Link>
              <Nav.Link href="/scan">Scan</Nav.Link>
              <Nav.Link href="/inventory">Inventory</Nav.Link>
              <Nav.Link href="/statistics">Statistics</Nav.Link>
              <Nav.Link href="/list">Shopping List</Nav.Link>
              <Nav.Link href="/recipes">Recipes</Nav.Link>
              <Nav.Link href="/profil">Profil</Nav.Link>
              <Nav.Link onClick={removeUser}>Logout</Nav.Link>
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
