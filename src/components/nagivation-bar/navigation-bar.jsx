import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';

export default function NavigationBar() {
   return (
      <Navbar expand="lg" bg="dark" data-bs-theme="dark" fixed="top">
         <Container>
            <Navbar.Brand href="#">
               <span className="h5 text-warning">MYFLIX</span>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarResponsive" />
            <Navbar.Collapse id="navbarResponsive">
               <Nav className="me-auto">
                  <Nav.Link href="#" className="active" aria-current="page">
                     Home
                  </Nav.Link>
               </Nav>
            </Navbar.Collapse>
         </Container>
      </Navbar>
   );
}
