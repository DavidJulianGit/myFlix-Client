import React, { useState } from 'react';
import {
   Modal,
   Container,
   Row,
   Col,
   Form,
   Button,
   InputGroup,
} from 'react-bootstrap';
import { EyeSlashFill, EyeFill } from 'react-bootstrap-icons';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../redux/Slices/user';

const signupUser = async (userData) => {
   try {
      const SignUpURL = 'https://myflix-z30i.onrender.com/users';
      const response = await fetch(SignUpURL, {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.status === 422) {
         throw new Error(data.errors.map(err => err.msg).join(', '));
      } else if (response.status === 201) {
         return data;
      } else if (response.status === 500) {
         throw new Error(data.message || 'Server error. Please try again later.');
      }
   } catch (error) {
      throw error;
   }
};

export default function SignupView() {
   const [formData, setFormData] = useState({
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      birthday: '',
   });
   const [showModal, setShowModal] = useState(false);
   const [modalContent, setModalContent] = useState({ title: '', message: '' });
   const [passwordShown, setPasswordShown] = useState(false);
   const dispatch = useDispatch();

   const togglePasswordVisibility = () => {
      setPasswordShown(!passwordShown);
   };

   const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData(prevState => ({
         ...prevState,
         [name]: value,
      }));
   };

   const handleSubmit = async (event) => {
      event.preventDefault();
      try {
         const userData = await signupUser(formData);

         setModalContent({ title: 'Welcome', message: `Signup successful! Welcome, ${userData.name || 'user'}.` });
         setShowModal(true);
         dispatch(loginUser({ email: formData.email, password: formData.password }));

      } catch (error) {
         setModalContent({ title: 'Error', message: error.message });
         setShowModal(true);
      }
   };

   return (
      <Container className="mt-5">
         <Row>
            <Col>
               <h3 className="mb-4">Sign Up</h3>
               <Form className="form" onSubmit={handleSubmit}>
                  {/* firstname */}
                  <Form.Group className="my-3">
                     <Form.Label htmlFor="firstname">First Name</Form.Label>
                     <Form.Control
                        type="text"
                        id="firstname"
                        name="firstname"
                        className="rounded"
                        value={formData.firstname}
                        onChange={handleChange}
                        required
                     />
                  </Form.Group>

                  {/* lastname */}
                  <Form.Group className="my-3">
                     <Form.Label htmlFor="lastname">Last Name</Form.Label>
                     <Form.Control
                        type="text"
                        id="lastname"
                        name="lastname"
                        value={formData.lastname}
                        onChange={handleChange}
                        required
                     />
                  </Form.Group>

                  {/* email */}
                  <Form.Group className="my-3">
                     <Form.Label htmlFor="email">Email</Form.Label>
                     <Form.Control
                        type="email"
                        id="email"
                        name="email"
                        className="rounded"
                        value={formData.email}
                        onChange={handleChange}
                        required
                     />
                  </Form.Group>

                  {/* password */}
                  <Form.Group className="my-3">
                     <Form.Label htmlFor="Password">Password</Form.Label>
                     <InputGroup>
                        <Form.Control
                           id="Password"
                           name="password"
                           type={passwordShown ? "text" : "password"}
                           value={formData.password}
                           onChange={handleChange}
                           minLength="8"
                           required
                        />
                        <Button
                           variant="outline-secondary"
                           onClick={togglePasswordVisibility}
                        >
                           {passwordShown ? <EyeSlashFill size={20} /> : <EyeFill size={20} />}
                        </Button>
                     </InputGroup>
                  </Form.Group>

                  {/* birthday */}
                  <Form.Group className="my-3">
                     <Form.Label htmlFor="birthday">Birthday</Form.Label>
                     <Form.Control
                        type="date"
                        id="birthday"
                        name="birthday"
                        className="rounded"
                        value={formData.birthday}
                        onChange={handleChange}
                        required
                     />
                  </Form.Group>
                  <Button type="submit" className="mt-2">
                     Sign Up
                  </Button>
               </Form>
            </Col>
         </Row>
         {/* MODAL */}
         <Modal size="sm" centered animation={false} show={showModal} onHide={() => setShowModal(false)}>
            <Modal.Header closeButton>
               <Modal.Title>Welcome!</Modal.Title>
            </Modal.Header>
            <Modal.Body>{modalContent.message}</Modal.Body>
         </Modal>
      </Container >
   );
}
