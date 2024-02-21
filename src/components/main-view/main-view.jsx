import React from 'react';
import { useState, useEffect } from 'react';

import MovieCard from '../movie-card/movie-card';
import MovieView from '../movie-view/movie-view';

//import MovieData from '../../../mockData/movieDB.movies.json';

export default function MainView() {
   const [movies, setMovies] = useState([]);
   const [selectedMovie, setSelectedMovie] = useState(null);
   const APIUrl = 'https://myflix-z30i.onrender.com/movies';

   useEffect(() => {
      fetch(APIUrl)
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
   }, []);

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
            <MovieView
               onBackClick={() => setSelectedMovie(null)}
               movie={selectedMovie}
            />

            <div className="container mt-5">
               <div className="row">
                  <div className="col">
                     <hr></hr>
                     <h2 className="my-4">Similar Movies</h2>
                  </div>
               </div>
               <div className="row">{similarMovieCards}</div>
            </div>
         </>
      );
   }

   if (movies.length === 0) {
      return <div>The list is empty!</div>;
   }

   return (
      <>
         <div className="container text-center">
            <div className="row g-5">
               {movies.map((movie, index) => {
                  return (
                     <MovieCard
                        key={movie._id}
                        movieData={movie}
                        onMovieClick={(newSelectedMovie) =>
                           setSelectedMovie(newSelectedMovie)
                        }
                     />
                  );
               })}
            </div>
         </div>
      </>
   );
}
