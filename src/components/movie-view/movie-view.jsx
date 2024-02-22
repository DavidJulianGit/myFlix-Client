import React from 'react';
import { Container, Row, Col, Button, Image } from 'react-bootstrap';
import PropTypes from 'prop-types';

import combineGenreNames from '../../utilities/combineGenreNames';

export default function MovieView({ movie, onBackClick }) {
   return (
      <Container>
         <Row>
            <Col md={6} className="p-3">
               <h1>{movie.title}</h1>
               <Container className="d-lg-flex flex-lg-row flex-column justify-content-between p-0">
                  <div className="item">
                     <h4 className="mb-0">{movie.director}</h4>
                  </div>
                  <div className="item">
                     <p className="mb-0">{combineGenreNames(movie.genres)}</p>
                  </div>
               </Container>
               <p className="my-5">{movie.description}</p>
               <Button variant="warning" onClick={onBackClick}>
                  Back
               </Button>
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
   movie: PropTypes.shape({
      title: PropTypes.string.isRequired,
      director: PropTypes.string.isRequired,
      genres: PropTypes.arrayOf(
         PropTypes.shape({
            name: PropTypes.string.isRequired,
         })
      ).isRequired,
      description: PropTypes.string.isRequired,
      poster: PropTypes.string.isRequired,
   }).isRequired,
   onBackClick: PropTypes.func.isRequired,
};
