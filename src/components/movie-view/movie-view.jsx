import React from 'react';
import { Container, Row, Col, Button, Image, } from 'react-bootstrap';
import PropTypes from 'prop-types';


import combineGenreNames from '../../utilities/combineGenreNames';
import { useParams } from 'react-router';

export default function MovieView({ movies }) {

   const { movieId } = useParams();
   const movie = movies.find(m => m.title === movieId);

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
               <Image
                  className="rounded movie-poster"
                  src={movie.poster}
                  alt={`Poster of the movie ${movie.title}`}
               />
            </Col>
         </Row>
      </Container>
   );
}

MovieView.propTypes = {
   movies: PropTypes.arrayOf(

      PropTypes.shape(
         {
            id: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
            director: PropTypes.string.isRequired,
            genres: PropTypes.arrayOf(
               PropTypes.shape({
                  name: PropTypes.string.isRequired,
               })
            ).isRequired,
            description: PropTypes.string.isRequired,
            poster: PropTypes.string.isRequired,
         }
      )

   ).isRequired,
};
