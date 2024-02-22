import React from 'react';
import {
   Alert,
   Container,
   Row,
   Col,
   Form,
   Button,
   FloatingLabel,
} from 'react-bootstrap';
import { useState } from 'react';

export default function SignupView({ onLoggedIn }) {
   const [userData, setUserData] = useState({
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      birthday: '',
   });
   const SignUpURL = 'https://myflix-z30i.onrender.com/users';

   const handleSubmit = (event) => {
      event.preventDefault();

      const data = {
         firstname: userData.firstname,
         lastname: userData.lastname,
         email: userData.email,
         password: userData.password,
         birthday: userData.birthday,
      };

      const headers = {
         'Content-Type': 'application/json',
         Host: 'myflix-z30i.onrender.com',
      };
      console.log(JSON.stringify(data));

      fetch(SignUpURL, {
         method: 'POST',
         headers: headers,
         body: JSON.stringify(data),
      }).then((response) => {
         if (response.ok) {
            alert('Signup successful');
            window.location.reload();
         } else {
            alert('Signup failed');
         }
      });
   };

   return (
      <Container className="mt-5">
         <Row>
            <Col></Col> {/* Empty column for spacing */}
            <Col>
               <h3 className="mb-4">Sign Up</h3>
               <Form className="login-form" onSubmit={handleSubmit}>
                  {/* firstname */}
                  <Form.Group className="my-3">
                     <FloatingLabel
                        controlId="floatingFirstname"
                        label="First Name"
                        className="mb-3">
                        <Form.Control
                           type="text"
                           className="rounded"
                           value={userData.firstname}
                           onChange={(e) =>
                              setUserData((prevUserData) => ({
                                 ...prevUserData,
                                 firstname: e.target.value,
                              }))
                           }
                           required
                        />
                     </FloatingLabel>
                  </Form.Group>

                  {/* lastname */}
                  <Form.Group className="my-3">
                     <FloatingLabel
                        controlId="floatingLasttname"
                        label="Last Name"
                        className="mb-3">
                        <Form.Control
                           type="text"
                           className="rounded"
                           value={userData.lastname}
                           onChange={(e) =>
                              setUserData((prevUserData) => ({
                                 ...prevUserData,
                                 lastname: e.target.value,
                              }))
                           }
                           required
                        />
                     </FloatingLabel>
                  </Form.Group>

                  {/* email */}
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

                  {/* password */}
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

                  {/* birthday */}
                  <Form.Group className="my-3">
                     <FloatingLabel
                        controlId="floatingbirthday"
                        label="Birthday"
                        className="mb-3">
                        <Form.Control
                           type="date"
                           className="rounded"
                           value={userData.birthday}
                           onChange={(e) => {
                              console.log(e.target.value);
                              setUserData((prevUserData) => ({
                                 ...prevUserData,
                                 birthday: e.target.value,
                              }));
                           }}
                           required
                        />
                     </FloatingLabel>
                  </Form.Group>

                  <Button variant="warning" type="submit" className="mt-2">
                     Sign Up
                  </Button>
               </Form>
            </Col>
            <Col></Col> {/* Empty column for spacing */}
         </Row>
      </Container>
   );
}
