
import React from 'react';
import { Container, Row, Col, Image, } from 'react-bootstrap';
import { useParams } from 'react-router';
import { IoStarOutline, IoStar } from "react-icons/io5";

import MovieCard from '../movie-card/movie-card';

import findSimilarMovies from '../../utilities/findSimilarMovies';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite } from '../../redux/Slices/user';


export default function MovieView() {

   // REDUX
   const movies = useSelector((state) => state.movies.data);
   const dispatch = useDispatch();

   // get the movieId from the URL
   const { movieId } = useParams();

   // find movie by movieId
   const movie = movies.find(movie => movie.title === movieId);

   // check if movie is a favorite
   const isFavorite = useSelector((state) => state.user.userData.favoriteMovies.includes(movie.id));

   // find similar movies
   const similarMovies = findSimilarMovies(movies, movie).map(movie => <MovieCard key={movie.id} movie={movie} />);

   const toggle = () => {
      dispatch(toggleFavorite({
         movieId: movie.id,
         isFavorite
      }));
   }

   function combineGenreNames(genres) {
      return genres.map((genre) => genre.name).join(', ');
   }

   return (
      <Container className='col-xl-10 col-l-11'>
         <Row>
            <Col md={6} className="p-3">
               <h1>{movie.title}</h1>
               <Container >
                  <Row className="d-sm-flex flex-sm-row flex-column justify-content-between align-items-end p-0 mb-2">
                     <Col className='p-0'>
                        <h4 className="mb-0">{movie.director}</h4>
                     </Col>
                     <Col className='p-0 text-nowrap text-sm-end '>
                        <p className="mb-0">{combineGenreNames(movie.genres)}</p>
                     </Col>
                  </Row>
               </Container>
               <hr className='my-0'></hr>
               <p className="my-sm-2">{movie.description}</p>
            </Col>
            <Col
               md={6}
               className="p-3 d-flex justify-content-center justify-content-md-end align-items-center">
               <div style={{ position: 'relative' }}>
                  <Image
                     className="rounded movie-poster"
                     src={movie.poster}
                     alt={`Poster of the movie ${movie.title}`}
                  />
                  {isFavorite ?

                     <IoStar
                        size="32px"
                        className='favoriteMovieIcon'
                        onClick={toggle}
                     />

                     :
                     <IoStarOutline
                        size="32px"
                        className='favoriteMovieIcon'
                        onClick={toggle}
                     />
                  }
               </div>
            </Col>
         </Row>
         <hr></hr>
         <Row>
            <h2>Similar Movies</h2>
            {similarMovies}

         </Row>
      </Container>
   );
}

