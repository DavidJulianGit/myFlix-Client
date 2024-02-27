import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';

import MovieCard from '../movie-card/movie-card';
import MovieView from '../movie-view/movie-view';
import LoginView from '../login-view/login-view';
import SignupView from '../signup-view/signup-view';
import NavigationBar from '../nagivation-bar/navigation-bar';
import ProfileView from '../profile-view/profile-view';

export default function MainView() {
   // Local Storage
   const storedUser = JSON.parse(localStorage.getItem('user'));
   const storedToken = localStorage.getItem('token');

   // State
   const [user, setUser] = useState(storedUser ? storedUser : null);
   const [token, setToken] = useState(storedToken ? storedToken : null);
   const [movies, setMovies] = useState([]);



   const APIUrl = 'https://myflix-z30i.onrender.com/movies';

   // Load data from API
   useEffect(() => {
      if (!token) {
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

            setMovies(moviesFromApi);
         });
   }, [token]);


   const handleLogout = () => {
      // Clear local storage
      localStorage.clear();
      // Reset user and token state
      setUser(null);
      setToken(null);
   };

   // Update the user's favorite movies list
   const updateUserFavoriteMovies = (updatedUser) => {
      setUser(updatedUser); // Assuming the updatedUser object includes the updated list of favorite movies
      localStorage.setItem('user', JSON.stringify(updatedUser)); // Update local storage
   };

   const movieCards = movies.map(movie => {
      return <MovieCard
         JWT={token}
         user={user}
         key={movie.id}
         movie={movie}
         updateFavorites={updateUserFavoriteMovies}
      />;
   })

   let favoriteMovies = user && user.favoriteMovies ? movies.filter(m => user.favoriteMovies.includes(m.id)) : [];
   const favoriteMovieCards = favoriteMovies.map(movie => {
      return <MovieCard JWT={token} user={user} key={movie.id} movie={movie} updateFavorites={updateUserFavoriteMovies} />;
   })

   return (
      <BrowserRouter>
         <NavigationBar user={user} onLoggedOut={handleLogout} />
         <Container className="mt-5">
            <Routes>
               <Route path="/signup" element={
                  user ?
                     (<Navigate to="/" />) : <SignupView />} />
               <Route path="/login" element={
                  user ?
                     (<Navigate to="/" />) :
                     <LoginView onLoggedIn={(user, token) => {
                        setUser(user);
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
                     <MovieView movies={movies} />}
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
                           <Container className="mt-5">
                              <Row>
                                 <Col className=''>
                                    <h2 className='mb-4'>My Favorite Movies</h2>
                                 </Col>
                              </Row>
                              <Row className="g-4">
                                 {favoriteMovieCards}
                              </Row>
                           </Container>
                           <hr></hr>
                           <ProfileView
                              movies={movies}
                              userData={user}
                              JWT={token}
                              onLoggedIn={(user, token) => {
                                 setUser(user);
                              }}
                              handleLogout={handleLogout}
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
