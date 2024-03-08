import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import { useEffect } from 'react';

//REDUX
import { useSelector, useDispatch } from 'react-redux';
import { fetchMovies } from '../../redux/reducers/movies';
import { setUserData, setToken } from '../../redux/reducers/user';

import MovieCard from '../movie-card/movie-card';
import MovieView from '../movie-view/movie-view';
import LoginView from '../login-view/login-view';
import SignupView from '../signup-view/signup-view';
import NavigationBar from '../navigation-bar/navigation-bar';
import ProfileView from '../profile-view/profile-view';



export default function MainView() {

   // Redux
   const movies = useSelector((state) => state.movies.data);
   const moviesStatus = useSelector((state) => state.movies.status);
   const moviesError = useSelector((state) => state.movies.error);
   const user = useSelector((state) => state.user.userData);
   const token = useSelector((state) => state.user.token);
   const dispatch = useDispatch();

   // Load data from API
   useEffect(() => {

      let savedUser = null;
      let savedToken = null;

      if (localStorage.getItem('user') && localStorage.getItem('token')) {
         savedUser = JSON.parse(localStorage.getItem('user'));
         savedToken = localStorage.getItem('token');
         console.log(savedUser);
         console.log(savedToken);
      }

      if (savedUser && savedToken) {
         dispatch(setUserData(savedUser));
         dispatch(setToken(savedToken));
         dispatch(fetchMovies(savedToken));
      }

      if (token) {
         dispatch(fetchMovies(token));
      }
   }, [token, dispatch]);

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


   const movieCards = movies.map(movie => {
      return <MovieCard key={movie.id} movie={movie} />;
   })



   return (
      <BrowserRouter>
         <NavigationBar />
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
                           <Row className="g-4">
                              {movieCards}
                           </Row>
                  }
               />

               <Route
                  path="/movies/:movieId"
                  element={!user ? <Navigate to="/login" replace /> : movies.length === 0 ? <Col>No movies to display!</Col> :
                     <MovieView />}
               />

               <Route
                  path="/"
                  element={user ? <Navigate to="/movies" replace /> :
                     <Navigate to="/login" replace />}
               />

               <Route path='/profile'
                  element={
                     user ?
                        <>
                           <ProfileView />
                        </>
                        : <Navigate to="/login" replace />
                  }
               />

            </Routes>
         </Container>
      </BrowserRouter>
   );
}
