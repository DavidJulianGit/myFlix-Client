import React from 'react';
import {
   Container,
   Row,
   Col,
   Form,
   Button,
   FloatingLabel,
} from 'react-bootstrap';
import { useState } from 'react';

export default function LoginView({ onLoggedIn }) {
   const [userData, setUserData] = useState({
      email: '',
      password: '',
   });
   const LoginURL = 'https://myflix-z30i.onrender.com/login';

   const handleSubmit = (event) => {
      event.preventDefault();

      const data = {
         email: userData.email,
         password: userData.password,
      };

      const headers = {
         'Content-Type': 'application/json',
         Host: 'myflix-z30i.onrender.com',
      };
      console.log(JSON.stringify(data));

      fetch(LoginURL, {
         method: 'POST',
         headers: headers,
         body: JSON.stringify(data),
      })
         .then((response) => response.json())
         .then((data) => {
            if (data.user) {
               localStorage.setItem('user', JSON.stringify(data.user));
               localStorage.setItem('token', data.token);
               onLoggedIn(data.user, data.token);
            } else {
               alert('No such user');
            }
         })
         .catch((e) => {
            alert('Something went wrong');
         });
   };

   return (
      <Container className="mt-5">
         <Row>
            <Col></Col> {/* Empty column for spacing */}
            <Col>
               <h3 className="mb-4">Login</h3>
               <Form className="login-form" onSubmit={handleSubmit}>
                  <Form.Group>
                     <FloatingLabel
                        controlId="floatingEmail"
                        label="Email Address"
                        className="mb-3">
                        <Form.Control
                           type="email"
                           className="rounded"
                           value={userData.email}
                           onChange={(e) =>
                              setUserData((prevUserData) => ({
                                 ...prevUserData,
                                 email: e.target.value,
                              }))
                           }
                           required
                        />
                     </FloatingLabel>
                  </Form.Group>

                  <Form.Group className="my-3">
                     <FloatingLabel
                        controlId="floatingPassword"
                        label="Password"
                        className="mb-3">
                        <Form.Control
                           type="password"
                           className="rounded"
                           value={userData.password}
                           onChange={(e) =>
                              setUserData((prevUserData) => ({
                                 ...prevUserData,
                                 password: e.target.value,
                              }))
                           }
                           minLength="8"
                           required
                        />
                     </FloatingLabel>
                  </Form.Group>

                  <Button variant="warning" type="submit" className="mt-2">
                     Login
                  </Button>
               </Form>
            </Col>
            <Col></Col> {/* Empty column for spacing */}
         </Row>
      </Container>
   );
}
