import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Container, Row, Col, Spinner } from 'react-bootstrap';

//REDUX
import { useSelector, useDispatch } from 'react-redux';
import { fetchMovies } from '../../redux/Slices/movies';
import { setUserData, setToken } from '../../redux/Slices/user';

// Components
import MovieView from '../movie-view/movie-view';
import LoginView from '../login-view/login-view';
import SignupView from '../signup-view/signup-view';
import NavigationBar from '../navigation-bar/navigation-bar';
import ProfileView from '../profile-view/profile-view';
import MovieList from '../movie-list/movie-list';

// Utilities
import ScrollToTop from '../../utilities/ScrollToTop';

export default function MainView() {

   // Redux
   const movies = useSelector((state) => state.movies.data);
   const moviesStatus = useSelector((state) => state.movies.status);
   const moviesError = useSelector((state) => state.movies.error);
   const user = useSelector((state) => state.user.userData);
   const token = useSelector((state) => state.user.token);
   const dispatch = useDispatch();

   // Function to safely parse JSON from localStorage
   const safelyParseJSON = (json) => {
      try {
         return JSON.parse(json);
      } catch (error) {
         console.error('Parsing error on ', json, error);
         return null; // Return null or any other fallback value on error
      }
   };

   // Load data from API
   useEffect(() => {

      // In case user & token are saved in local storage - user does not have to login again.
      const savedUser = safelyParseJSON(localStorage.getItem('user'));
      const savedToken = localStorage.getItem('token');

      if (!user && savedUser) {
         dispatch(setUserData(savedUser));
      }
      if (!token && savedToken) {
         dispatch(setToken(savedToken));
      }

      if (savedToken && !movies.length) {
         dispatch(fetchMovies(savedToken));
      }
   }, [user, token, movies.length, dispatch]);


   // Handling loading state
   if (moviesStatus === 'loading') {
      return (
         <Container>
            <Row>
               <Col className="d-flex justify-content-center align-items-center">
                  <Spinner animation="border" role="status">
                     <span className="visually-hidden">Loading...</span>
                  </Spinner>
               </Col>
            </Row>
         </Container>
      );
   }

   // Handling error state
   if (moviesStatus === 'failed') {
      return (
         <Container>
            <Row>
               <Col className="d-flex justify-content-center align-items-center">
                  <p>Error fetching movies: {moviesError}</p>
               </Col>
            </Row>
         </Container>
      );
   }




   return (
      <BrowserRouter>
         <NavigationBar />
         <ScrollToTop />
         <Container className="mt-5">
            <Routes>
               <Route path="/signup" element={
                  user ?
                     (<Navigate to="/" />) : <SignupView />} />
               <Route path="/login" element={
                  user ?
                     (<Navigate to="/" />) :
                     <LoginView />}
               />
               <Route
                  path="/movies"
                  element={
                     !user ? <Navigate to="/login" replace /> :
                        movies.length === 0 ?
                           <Col><h2 className="my-4">No movies to display!</h2></Col> :

                           <MovieList />
                  }
               />

               <Route
                  path="/movies/:movieId"
                  element={!user ? <Navigate to="/login" replace /> : movies.length === 0 ?
                     <Col>No movies to display!</Col> :
                     <MovieView />}
               />

               <Route
                  path="/"
                  element={user ? <Navigate to="/movies" replace /> :
                     <Navigate to="/login" replace />}
               />

               <Route path='/profile'
                  element={
                     user ? <ProfileView /> : <Navigate to="/login" replace />
                  }
               />

            </Routes>
         </Container>
      </BrowserRouter>
   );
}
