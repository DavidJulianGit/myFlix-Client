import React, { useEffect } from 'react';
import MovieFilter from '../movie-filter/movie-filter';
import MovieCard from '../movie-card/movie-card';
import { useSelector } from 'react-redux';
import { Row } from 'react-bootstrap';

export default function MovieList() {

   const movies = useSelector((state) => state.movies.data);
   const filter = useSelector((state) => state.movies.filter).trim().toLowerCase();


   let filteredMovies = movies.filter((movie) => {
      return movie.title.toLowerCase().includes(filter);
   });

   useEffect(() => {
      if (filteredMovies === null) {
         console.log('inside if in useEffect in MovieList');
         filteredMovies = movies.filter((movie) => {
            return movie.title.toLowerCase().includes(filter);
         });
      }
   }, [filter]);


   const movieCards = filteredMovies.map(movie => {
      return <MovieCard key={movie.id} movie={movie} />;
   });

   return (
      <Row className="g-4">
         <MovieFilter />
         <hr></hr>
         {movieCards}
      </Row>
   );
}
