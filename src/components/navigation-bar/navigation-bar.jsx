import React from 'react';
import { Navbar, Nav, Container, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { clearUser } from '../../redux/reducers/user';

export default function NavigationBar() {

   const user = useSelector((state) => state.user.userData);
   const dispatch = useDispatch();

   return (
      <Navbar expand="lg" className='bg-primary' data-bs-theme="dark" fixed="top">
         <Container>
            <Navbar.Brand as={Link} to="/">
               <span className="h5">MYFLIX</span>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarResponsive" />
            <Navbar.Collapse id="navbarResponsive">
               <Nav className="me-auto">
                  {user === null ? (
                     // Show login and signup links if there's no user
                     <>
                        <Nav.Link as={Link} to="/login">
                           Login
                        </Nav.Link>
                        <Nav.Link as={Link} to="/signup">
                           Signup
                        </Nav.Link>
                     </>
                  ) : (
                     // Show home and logout links if there's a user
                     <>
                        <Nav.Link as={Link} to="/movies">
                           Home
                        </Nav.Link>
                        <Nav.Link as={Link} to="/profile">
                           Profile
                        </Nav.Link>
                     </>
                  )}
               </Nav>
               {user !== null && (
                  <Nav>
                     <Nav.Link onClick={() => dispatch(clearUser())} className="ms-auto text-warning">
                        Logout
                     </Nav.Link>
                  </Nav>
               )}
            </Navbar.Collapse>
         </Container>
      </Navbar>

   );
}
