import React from 'react';
import { useState } from 'react';
import MovieCard from '../movie-card/movie-card';
import {
   Container,
   Row,
   Col,
   Form,
   Button,
   InputGroup,
   Modal
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { setUserData, setToken, clearUser } from '../../redux/reducers/user';



export default function ProfileView() {

   const movies = useSelector((state) => state.movies.data);
   const user = useSelector((state) => state.user.userData);
   const token = useSelector((state) => state.user.token);
   const dispatch = useDispatch();

   const [localUser, setLocalUser] = useState(user);
   const [newPassword, setNewPassword] = useState('');
   const [newPasswordRepeat, setNewPasswordRepeat] = useState('');
   const [passwordShown, setPasswordShown] = useState(false);
   const [checkPhrase, setCheckPhrase] = useState(false);
   const [showModal, setShowModal] = useState(false);
   const [modalData, setModalData] = useState({ title: '', message: '' });

   const UpdateUserDataURL = `https://myflix-z30i.onrender.com/users/${user.email}`;


   const togglePasswordVisibility = () => {
      setPasswordShown(!passwordShown);
   }

   function fetchRequest(data) {

      const headers = {
         'Content-Type': 'application/json',
         Host: 'myflix-z30i.onrender.com',
         Authorization: `Bearer ${token}`
      }

      fetch(UpdateUserDataURL, {
         method: 'PATCH',
         headers: headers,
         body: JSON.stringify(data),
      })
         .then(response => response.json())
         .then(updatedUser => {
            if (updatedUser) {
               dispatch(setUserData(updatedUser));

               // Reset password inputs
               setNewPassword('');
               setNewPasswordRepeat('');

               setModalData({ title: 'Update', message: 'User data successfully updated.', error: false });
               setShowModal(true); 
            } else {
               throw new Error('Update unsuccessful.');
            }
         })
         .catch((e) => {
            setModalData({ title: 'Error', message: `Something went wrong: ${e.message}`, error: true });
            setShowModal(true);
         });

   }

   const handleUserUpdateSubmit = (event) => {
      event.preventDefault();

      const data = {
         firstname: localUser.firstname,
         lastname: localUser.lastname,
         email: localUser.email,
         birthday: localUser.birthday,
      };

      fetchRequest(data);
   };

   const handlePasswordUpdateSubmit = (event) => {
      event.preventDefault();

      const data = {
         password: newPassword
      };

      fetchRequest(data);
   };

   const handleDeleteAccount = (event) => {
      event.preventDefault();

      const headers = {
         'Content-Type': 'application/json',
         Host: 'myflix-z30i.onrender.com',
         Authorization: `Bearer ${JWT}`
      }

      fetch(UpdateUserDataURL, {
         method: 'DELETE',
         headers: headers,
      })
         .then(response => {
            if (response.status === 200) {
               dispatch(clearUser());
            }
         })
         .catch((e) => {
            setModalData({ title: 'Error', message: `Something went wrong: ${e.message}` });
            setShowModal(true);
         });
   };

   // Format date to yyyy-mm-dd
   function formatDateForInput(dateString) {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat('en-CA').format(date); // YYYY-MM-DD format
   }

   // Phase the user has to type in to enable account deletion
   const StringToDeleteAccount = `Delete account ${user.email}`;

   let favoriteMovies = user && user.favoriteMovies ? movies.filter(m => user.favoriteMovies.includes(m.id)) : [];
   const favoriteMovieCards = favoriteMovies.map(movie => {
      return <MovieCard key={movie.id} movie={movie} />;
   })

   return (
      <Container className="mt-5">
         <Row>
            <Col className=''>
               <h2 className='mb-4'>My Favorite Movies</h2>
            </Col>
         </Row>
         <Row className="g-4">
            {favoriteMovieCards}
         </Row>
         <hr></hr>
         <Row>
            <Col></Col> {/* Empty column for spacing */}
            <Col>
               {/* Updating User Data Form*/}
               <h3 className="mb-4">Account Information</h3>
               <Form className="login-form" onSubmit={handleUserUpdateSubmit}>
                  {/* firstname */}
                  <Form.Group className="my-3">
                     <Form.Label htmlFor="Firstname">First Name</Form.Label>
                     <Form.Control
                        id="Firstname"
                        type="text"
                        value={localUser.firstname}
                        onChange={(e) =>
                           setLocalUser((prevUser) => ({
                              ...prevUser,
                              firstname: e.target.value,
                           }))
                        }
                     />
                  </Form.Group>

                  {/* lastname */}
                  <Form.Group className="my-3">
                     <Form.Label htmlFor="Lastname">Last Name</Form.Label>
                     <Form.Control
                        id="Lastname"
                        type="text"
                        value={localUser.lastname}
                        onChange={(e) =>
                           setLocalUser((prevUser) => ({
                              ...prevUser,
                              lastname: e.target.value,
                           }))
                        }
                        required
                     />
                  </Form.Group>

                  {/* email */}
                  <Form.Group className="my-3">
                     <Form.Label htmlFor="Email">Email</Form.Label>
                     <Form.Control
                        id="Email"
                        type="email"

                        value={localUser.email}
                        onChange={(e) =>
                           setLocalUser((prevUser) => ({
                              ...prevUser,
                              email: e.target.value,
                           }))
                        }
                     />
                  </Form.Group>

                  {/* birthday */}
                  <Form.Group className="my-3">
                     <Form.Label htmlFor="Birthday">Birthday</Form.Label>
                     <Form.Control
                        id="Birthday"
                        type="date"

                        value={formatDateForInput(localUser.birthday)}
                        onChange={(e) => {
                           setLocalUser((prevUser) => ({
                              ...prevUser,
                              birthday: e.target.value,
                           }));
                        }}
                     />
                  </Form.Group>
                  <Button type="submit" className="mt-2">
                     Save
                  </Button>
               </Form>

               {/* Changing Password Form*/}
               <h4 className='mt-4'>Change password</h4>
               <Form onSubmit={handlePasswordUpdateSubmit}>
                  {/* password */}
                  <Form.Group className="">
                     <Form.Label htmlFor="Password">New Password</Form.Label>
                     <InputGroup>
                        <Form.Control
                           id="Password"
                           type={passwordShown ? "text" : "password"}
                           value={newPassword}
                           onChange={(e) => setNewPassword(e.target.value)}
                           minLength="8"
                           isInvalid={newPassword && newPasswordRepeat && newPassword !== newPasswordRepeat}
                        />
                        <Button
                           variant="outline-secondary"
                           onClick={togglePasswordVisibility}
                        >
                           {passwordShown ? "Hide" : "Show"}
                        </Button>
                     </InputGroup>
                  </Form.Group>

                  {/* password Check*/}
                  <Form.Group className="my-3">
                     <Form.Label htmlFor="PasswordCheck">Repeat Password</Form.Label>
                     <InputGroup>
                        <Form.Control
                           id="newPasswordRepeat"
                           type={passwordShown ? "text" : "password"}
                           value={newPasswordRepeat}
                           onChange={(e) => setNewPasswordRepeat(e.target.value)}
                           minLength="8"
                           isInvalid={newPassword && newPasswordRepeat && newPassword !== newPasswordRepeat}
                        />
                        <Button
                           variant="outline-secondary"
                           onClick={togglePasswordVisibility}
                        >
                           {passwordShown ? "Hide" : "Show"}
                        </Button>
                     </InputGroup>
                     <Form.Control.Feedback type="invalid">
                        Passwords must match.
                     </Form.Control.Feedback>
                  </Form.Group>
                  <Button type="submit" className="mt-2" disabled={!(newPassword && newPasswordRepeat && newPassword === newPasswordRepeat)}>
                     Change Password
                  </Button>
               </Form>
               <hr></hr>
               <h3>Delete Account</h3>
               <Form onSubmit={handleDeleteAccount}>
                  <Form.Label htmlFor="deleteAccountCheck">
                     <p className='fw-lighter'>To confirm account deletion, type: <br /><span className='fw-semibold'>
                        {StringToDeleteAccount}
                     </span> <br />into the box below.</p>
                  </Form.Label>
                  <Form.Control
                     className="mb-2"
                     type='text'
                     id="deleteAccountCheck"
                     onChange={(e) => {
                        e.target.value === StringToDeleteAccount ? setCheckPhrase(true) : setCheckPhrase(false)
                     }}
                  />
                  <Button type="submit" variant='danger' disabled={!checkPhrase}>Delete Account</Button>
               </Form>
            </Col>
            <Col></Col> {/* Empty column for spacing */}
         </Row>
         {/* MODAL */}
         <Modal show={showModal} onHide={() => setShowModal(false)}>
            <Modal.Header closeButton>
               <Modal.Title className={'text-warning'}>{modalData.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body className={modalData.error ? 'text-danger' : 'text-success'}>{modalData.message}</Modal.Body>
         </Modal>
      </Container>
   );
}
