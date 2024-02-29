import React from 'react';
import {
   Modal,
   Container,
   Row,
   Col,
   Form,
   Button,
   InputGroup,
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

   const [passwordShown, setPasswordShown] = useState(false);
   const [showModal, setShowModal] = useState(false);
   const [modalData, setModalData] = useState({ title: '', message: '' });

   const togglePasswordVisibility = () => {
      setPasswordShown(!passwordShown);
   }


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

      const SignUpURL = 'https://myflix-z30i.onrender.com/users';

      fetch(SignUpURL, {
         method: 'POST',
         headers: headers,
         body: JSON.stringify(data),
      })
         .then((response) => {

            console.log(response.status);

            if (response.status === 201) {

               window.location.reload();

            }
            else {
               return response.text().then(text => { throw new Error(text) });
            }
         })
         .catch(error => {
            setModalData({ title: 'Signup failed', message: error });
            setShowModal(true);
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
                     <Form.Label htmlFor="firstname">First Name</Form.Label>
                     <Form.Control
                        type="text"
                        id="firstname"
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
                  </Form.Group>

                  {/* lastname */}
                  <Form.Group className="my-3">
                     <Form.Label htmlFor="lastname">Last Name</Form.Label>
                     <Form.Control
                        type="text"
                        id="lastname"
                        value={userData.lastname}
                        onChange={(e) =>
                           setUserData((prevUserData) => ({
                              ...prevUserData,
                              lastname: e.target.value,
                           }))
                        }
                        required
                     />
                  </Form.Group>

                  {/* email */}
                  <Form.Group className="my-3">
                     <Form.Label htmlFor="email">Email</Form.Label>
                     <Form.Control
                        type="email"
                        id="email"
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
                  </Form.Group>

                  {/* password */}
                  <Form.Group className="my-3">
                     <Form.Label htmlFor="Password">Password</Form.Label>
                     <InputGroup>
                        <Form.Control
                           id="Password"
                           type={passwordShown ? "text" : "password"}
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
                        <Button
                           variant="outline-secondary"
                           onClick={togglePasswordVisibility}
                        >
                           {passwordShown ? "Hide" : "Show"}
                        </Button>
                     </InputGroup>
                  </Form.Group>

                  {/* birthday */}
                  <Form.Group className="my-3">
                     <Form.Label htmlFor="birthday">Birthday</Form.Label>
                     <Form.Control
                        type="date"
                        id="birthday"
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
                  </Form.Group>

                  <Button type="submit" className="mt-2">
                     Sign Up
                  </Button>
               </Form>
            </Col>
            <Col></Col> {/* Empty column for spacing */}
         </Row>
         {/* MODAL */}
         <Modal show={showModal} onHide={() => setShowModal(false)}>
            <Modal.Header closeButton>
               <Modal.Title>{modalData.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{modalData.message}</Modal.Body>
         </Modal>
      </Container >
   );
}
