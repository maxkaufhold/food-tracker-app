import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function NavbarMobile() {
  return (
    <>
      <Navbar fixed="bottom" bg="dark" data-bs-theme="dark">
        <Container className="justify-content-center">
          <Nav className="me-auto">
            <Nav.Link href="/scan">Scan</Nav.Link>
            <Nav.Link href="/home">Home</Nav.Link>
            <Nav.Link href="/profil">Profil</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <br />
    </>
  );
}

export default NavbarMobile;
