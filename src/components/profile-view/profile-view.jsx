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
import { setUserData, clearUser } from '../../redux/reducers/user';
import { EyeSlashFill, EyeFill } from 'react-bootstrap-icons';
import formatDateForInput from '../../utilities/formatDate';

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
   const [showDeleteConfirmationModal, setShowDeleteConfirmationModal] = useState(false);
   const [showPasswordChangeModal, setShowPasswordChangeModal] = useState(false);
   const UpdateUserDataURL = `https://myflix-z30i.onrender.com/users/${user.email}`;


   const togglePasswordVisibility = () => {
      setPasswordShown(!passwordShown);
   }

   function fetchRequest(data, type) {


      let fetchOptions = {
         method: 'PATCH',
         headers: {
            'Content-Type': 'application/json',
            Host: 'myflix-z30i.onrender.com',
            Authorization: `Bearer ${token}`
         },
         body: JSON.stringify(data),
      }


      // Set fetchOptions and modal content according to request type
      switch (type) {
         case 'userData':
            setModalData({ title: 'Update', message: 'Changes saved.', error: false });
            break;
         case 'password':

            setModalData({ title: 'Update', message: 'New password saved.', error: false });
            break;
         default:
            setModalData({ title: 'Update', message: 'User data successfully updated.', error: false });
      }

      fetch(UpdateUserDataURL, fetchOptions)
         .then(response => {
            if (response.ok) {
               return response.json();
            } else {
               throw new Error('Failed to update account.');
            }
         })
         .then(updatedUser => {

            console.log(updatedUser);

            // Reset password inputs
            setNewPassword('');
            setNewPasswordRepeat('');

            setShowModal(true);

            dispatch(setUserData(updatedUser));

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
      fetchRequest(data, 'userData');
   };

   const handlePasswordChangeSubmit = (event) => {
      event.preventDefault();

      setShowPasswordChangeModal(false);
      fetchRequest({ password: newPassword }, 'password');
   };

   const handleDeleteAccount = () => {
      // Hide modal
      setShowDeleteConfirmationModal(false);

      const headers = {
         'Content-Type': 'application/json',
         Authorization: `Bearer ${token}`,
      };

      fetch(UpdateUserDataURL, {
         method: 'DELETE',
         headers: headers,
      })
         .then(response => {
            if (response.ok) {
               dispatch(clearUser());
            } else {
               throw new Error('Failed to delete account.');
            }
         })
         .catch((e) => {
            setModalData({ title: 'Error', message: `Something went wrong: ${e.message}` });
            setShowModal(true);
         });
   };

   // Phrase the user has to type in to enable account deletion
   const StringToDeleteAccount = `Delete account ${user.email}`;

   // get MovieCards of favorite movies
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
               <Form onSubmit={(event) => {
                  event.preventDefault();
                  setShowPasswordChangeModal(true);
               }}>
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
                        <Button variant="outline-secondary" onClick={togglePasswordVisibility}>
                           {passwordShown ? <EyeSlashFill size={20} /> : <EyeFill size={20} />}
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

                        <Button variant="outline-secondary" onClick={togglePasswordVisibility}>
                           {passwordShown ? <EyeSlashFill size={20} /> : <EyeFill size={20} />}
                        </Button>

                     </InputGroup>

                     <Form.Control.Feedback type="invalid">
                        Passwords must match.

                     </Form.Control.Feedback>
                  </Form.Group>

                  <Button
                     type="submit"
                     className="mt-2"
                     disabled={!(newPassword && newPasswordRepeat && newPassword === newPasswordRepeat)}>
                     Change Password
                  </Button>

               </Form>

               <hr></hr>
               {/* Delete Account Form*/}
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
                  <Button variant='danger' onClick={() => setShowDeleteConfirmationModal(true)} disabled={!checkPhrase}>
                     Delete Account
                  </Button>
               </Form>
            </Col>
            <Col></Col> {/* Empty column for spacing */}
         </Row>

         {/* Change Password Confirmation MODAL */}
         <Modal show={showPasswordChangeModal} onHide={() => setShowPasswordChangeModal(false)} centered animation={false}>
            <Modal.Header closeButton>
               <Modal.Title className='text-warning'>Change password</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to <span className='text-warning'>change</span> your <span className='text-warning'>password</span>?</Modal.Body>
            <Modal.Footer>
               <Button variant="secondary" onClick={() => setShowPasswordChangeModal(false)}>Cancel</Button>
               <Button variant="danger" onClick={handlePasswordChangeSubmit}>Change Password</Button>
            </Modal.Footer>
         </Modal>

         {/* Delete Account Confirmation MODAL */}
         <Modal show={showDeleteConfirmationModal} onHide={() => setShowDeleteConfirmationModal(false)} centered animation={false}>
            <Modal.Header closeButton>
               <Modal.Title className='text-warning'>Confirm Account Deletion</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to <span className='text-warning'>delete</span> your account?<br />This action cannot be undone.</Modal.Body>
            <Modal.Footer>
               <Button variant="secondary" onClick={() => setShowDeleteConfirmationModal(false)}>Cancel</Button>
               <Button variant="danger" onClick={handleDeleteAccount}>Delete Account</Button>
            </Modal.Footer>
         </Modal>

         {/* MODAL */}
         <Modal size="sm" show={showModal} onHide={() => setShowModal(false)} centered animation={false}>
            <Modal.Header closeButton>
               <Modal.Title className='text-warning fs-5'>{modalData.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{modalData.message}</Modal.Body>
         </Modal>

      </Container>
   );
}
