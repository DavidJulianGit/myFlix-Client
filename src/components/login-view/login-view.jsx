import React from 'react';
import {
   Container,
   Row,
   Col,
   Form,
   Button,
   InputGroup,
   Modal
} from 'react-bootstrap';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUserData, setToken } from '../../redux/reducers/user';

export default function LoginView({ onLoggedIn }) {

   // REDUX
   const dispatch = useDispatch();

   // Local State
   const [loginUserData, setloginUserData] = useState({
      email: '',
      password: '',
   });
   const [passwordShown, setPasswordShown] = useState(false);
   const [showModal, setShowModal] = useState(false);
   const [modalMessage, setModalMessage] = useState('');

   const togglePasswordVisibility = () => {
      setPasswordShown(!passwordShown);
   }


   const handleSubmit = (event) => {
      event.preventDefault();

      const headers = {
         'Content-Type': 'application/json',
         Host: 'myflix-z30i.onrender.com',
      };

      const data = {
         email: loginUserData.email,
         password: loginUserData.password
      }

      const LoginURL = 'https://myflix-z30i.onrender.com/login';

      fetch(LoginURL, {
         method: 'POST',
         headers: headers,
         body: JSON.stringify(data),
      })
         .then((response) => response.json())
         .then((data) => {

            if (data.user) {
               dispatch(setUserData(data.user));
               dispatch(setToken(data.token));

            } else {
               setModalMessage(data.message.message);
               setShowModal(true);
            }
         })
         .catch((e) => {
            console.error(e);
            setModalMessage('Login failed: Please check your credentials and try again.');
            setShowModal(true);
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
                     <Form.Label htmlFor="Email">Email</Form.Label>
                     <Form.Control
                        type="email"
                        id="Email"
                        className="rounded"
                        value={loginUserData.email}
                        onChange={(e) =>
                           setloginUserData((prevloginUserData) => ({
                              ...prevloginUserData,
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
                           value={loginUserData.password}
                           onChange={(e) =>
                              setloginUserData((prevloginUserData) => ({
                                 ...prevloginUserData,
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

                  <Button type="submit" className="mt-2">
                     Login
                  </Button>
               </Form>
            </Col>
            <Col></Col> {/* Empty column for spacing */}
         </Row>
         <Modal show={showModal} onHide={() => setShowModal(false)}>
            <Modal.Header closeButton>
               <Modal.Title>{modalMessage}</Modal.Title>
            </Modal.Header>
         </Modal>
      </Container>
   );
}
