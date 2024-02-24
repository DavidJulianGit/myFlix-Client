import React from 'react';

import { Container, Row, Col, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';

import MovieCard from '../movie-card/movie-card';
import MovieView from '../movie-view/movie-view';
import LoginView from '../login-view/login-view';
import SignupView from '../signup-view/signup-view';

export default function MainView() {
   // Local Storage
   const storedUser = JSON.parse(localStorage.getItem('user'));
   const storedToken = localStorage.getItem('token');

   // State
   const [user, setUser] = useState(storedUser ? storedUser : null);
   const [token, setToken] = useState(storedToken ? storedToken : null);
   const [movies, setMovies] = useState([]);
   const [selectedMovie, setSelectedMovie] = useState(null);

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

   // Display LoginView if no user is logged in
   if (!user) {
      return (
         <Container className="mt-5">
            <Row>
               <Col>
                  <LoginView
                     onLoggedIn={(user, token) => {
                        setUser(user);
                        setToken(token);
                     }}
                  />
               </Col>
            </Row>
            <Row>
               <Col className="mt-5 d-flex justify-content-center justify-content-md-center align-items-center">
                  <h4>or</h4>
               </Col>
            </Row>
            <Row>
               <Col>
                  <SignupView
                     onLoggedIn={(user, token) => {
                        setUser(user);
                        setToken(token);
                     }}
                  />
               </Col>
            </Row>
         </Container>
      );
   }

   if (selectedMovie) {
      // Array of genre names of selectedMovie
      const selectedMovieGenres = selectedMovie.genres.map(
         (genre) => genre.name
      );

      // Array of movies with at least one genre in common with selectedMovie
      const moviesWithCommonGenres = movies.filter((movie) => {
         return movie.genres.some((genre) => {
            return (
               selectedMovieGenres.includes(genre.name) &&
               movie.title !== selectedMovie.title
            );
         });
      });

      // Moviecards of similar movies
      const similarMovieCards = moviesWithCommonGenres.map((movie) => {
         return (
            <MovieCard
               key={movie._id}
               movieData={movie}
               onMovieClick={(newSelectedMovie) =>
                  setSelectedMovie(newSelectedMovie)
               }
            />
         );
      });

      return (
         <>
            <Container className="mt-5">
               <Row>
                  <Col className="text-center mb-5">
                     <Button variant="warning" onClick={handleLogout}>
                        Logout
                     </Button>
                  </Col>
               </Row>
               <Row>
                  <Col>
                     <MovieView
                        onBackClick={() => setSelectedMovie(null)}
                        movie={selectedMovie}
                     />
                  </Col>
               </Row>
            </Container>

            <Container className="mt-5">
               <Row>
                  <Col>
                     <hr />
                     <h2 className="my-4">Similar Movies</h2>
                  </Col>
               </Row>
               <Row>{similarMovieCards}</Row>
            </Container>
         </>
      );
   }

   if (movies.length === 0) {
      return (
         <Container className="mt-5">
            <Row>
               <Col>
                  <h2 className="my-4">No movies to display!</h2>
               </Col>
            </Row>
         </Container>
      );
   }

   return (
      <>
         <Container className="text-center">
            <Row>
               <Col className="mb-5">
                  <Button variant="warning" onClick={handleLogout}>
                     Logout
                  </Button>
               </Col>
            </Row>
            <Row className="g-5">
               {movies.map((movie) => (
                  <MovieCard
                     key={movie.id}
                     movieData={movie}
                     onMovieClick={() => setSelectedMovie(movie)}
                  />
               ))}
            </Row>
         </Container>
      </>
   );
}
