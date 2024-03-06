import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { useState, useEffect } from 'react';

//REDUX
import { useSelector, useDispatch } from 'react-redux';
import { setMovies } from '../../redux/reducers/movies';
import { setUserData, setToken, clearUser } from '../../redux/reducers/user';

import MovieCard from '../movie-card/movie-card';
import MovieView from '../movie-view/movie-view';
import LoginView from '../login-view/login-view';
import SignupView from '../signup-view/signup-view';
import NavigationBar from '../navigation-bar/navigation-bar';
import ProfileView from '../profile-view/profile-view';



export default function MainView() {
   // Local Storage
   const storedUser = JSON.parse(localStorage.getItem('user'));
   const storedToken = localStorage.getItem('token');

   // State
   //const [user, setUser] = useState(storedUser ? storedUser : null);
   //const [token, setToken] = useState(storedToken ? storedToken : null);
   //const [movies, setMovies] = useState([]);

   // Redux
   const movies = useSelector((state) => state.movies);
   const user = useSelector((state) => state.user.userData);
   const token = useSelector((state) => state.user.token);
   const dispatch = useDispatch();

   const APIUrl = 'https://myflix-z30i.onrender.com/movies';
   console.log('main-view:');
   console.log(user);
   console.log(token);

   // Load data from API
   useEffect(() => {
      if (!token) {
         console.log('No token');
         return;
      }

      fetch(APIUrl, {
         headers: { Authorization: `Bearer ${token}` },
      })
         .then((response) => response.json())
         .then((data) => {

            const moviesFromApi = data.map((movie) => {
               return {
                  id: movie._id,
                  title: movie.title,
                  poster: movie.poster,
                  director: movie.director.name,
                  genres: movie.genres,
                  description: movie.description,
               };
            });

            //setMovies(moviesFromApi);
            dispatch(setMovies(moviesFromApi));
         });
   }, [token]);


   const handleLogout = () => {
      // Clear local storage
      localStorage.clear();
      // Reset user and token state
      dispatch(clearUser());
   };



   const movieCards = movies.map(movie => {
      return <MovieCard
         JWT={token}
         key={movie.id}
         movie={movie}
      />;
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
                     <LoginView onLoggedIn={(token) => {
                        setToken(token);
                     }} />}
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
                     <MovieView
                        JWT={token}
                     />}
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
                           <ProfileView
                              JWT={token}
                           />
                        </>
                        : <Navigate to="/login" replace />
                  }
               />

            </Routes>
         </Container>
      </BrowserRouter>
   );
}
