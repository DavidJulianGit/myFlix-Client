import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col, Button, Image, } from 'react-bootstrap';
import { useParams } from 'react-router';
import { IoStarOutline, IoStar } from "react-icons/io5";

import MovieCard from '../movie-card/movie-card';
import combineGenreNames from '../../utilities/combineGenreNames';
import findSimilarMovies from '../../utilities/findSimilarMovies';
import { useDispatch, useSelector } from 'react-redux';
import { setUserData } from '../../redux/reducers/user';

export default function MovieView({ JWT }) {

   // REDUX
   const movies = useSelector((state) => state.movies.data);
   const user = useSelector((state) => state.user);
   const dispatch = useDispatch();

   // get the movieId from the URL
   const { movieId } = useParams();

   // get the movie with _id movieId
   const movie = movies.find(movie => movie.title === movieId);

   const similarMovies = findSimilarMovies(movies, movie).map(movie => {
      return (
         <MovieCard
            movie={movie}
            JWT={JWT}
         />
      );
   })

   const isFavorite = user && user.favoriteMovies ? user.favoriteMovies.includes(movie.id) : false;
   const favoriteIconStyle = {
      position: 'absolute',
      top: '10px',
      right: '10px',
      cursor: 'pointer',
      zIndex: 1,
   };

   const toggleFavorite = (event) => {
      event.preventDefault();

      const headers = {
         'Content-Type': 'application/json',
         Host: 'myflix-z30i.onrender.com',
         Authorization: `Bearer ${JWT}`
      }

      const UpdateFavoriteMovieURL = `https://myflix-z30i.onrender.com/users/${user.email}/favoriteMovies/${movie.id}`;

      fetch(UpdateFavoriteMovieURL, {
         method: isFavorite ? 'DELETE' : 'POST',
         headers: headers,

      })
         .then((response) => response.json())
         .then((data) => {
            console.log(data);
            dispatch(setUserData(data));
         })
         .catch((e) => {
            console.error('Error:', e);
            alert('Something went wrong: ' + e.message);
         });


   };

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
                        style={favoriteIconStyle}
                        onClick={toggleFavorite}
                     />

                     :
                     <IoStarOutline
                        size="32px"
                        style={favoriteIconStyle}
                        onClick={toggleFavorite}
                     />
                  }
               </div>
            </Col>
         </Row>
         <hr></hr>
         <Row>

            {similarMovies}

         </Row>
      </Container>
   );
}

MovieView.propTypes = {

};
