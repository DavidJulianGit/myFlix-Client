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
      return (
         <MovieView
            onBackClick={() => setSelectedMovie(null)}
            movie={selectedMovie}
         />
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
                        key={index}
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
