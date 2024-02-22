import { Col, Card } from 'react-bootstrap';

import PropTypes from 'prop-types';
import combineGenreNames from '../../utilities/combineGenreNames';

export default function MovieCard({ movieData, onMovieClick }) {
   return (
      <Col lg={4} md={6} className="mb-3">
         <Card className="p-0 card text-start">
            <Card.Img
               onClick={() => onMovieClick(movieData)}
               src={movieData.poster}
               alt={`Movie poster of ${movieData.title}`}
               variant="top"
            />
            <Card.Body>
               <Card.Title onClick={() => onMovieClick(movieData)}>
                  {movieData.title}
               </Card.Title>
               <Card.Text className="card-text">
                  {movieData.description}
               </Card.Text>
            </Card.Body>
            <Card.Footer className="m-3 text-end">
               <small className="text-muted">
                  {combineGenreNames(movieData.genres)}
               </small>
            </Card.Footer>
         </Card>
      </Col>
   );
}
MovieCard.propTypes = {
   movie: PropTypes.shape({
      title: PropTypes.string.isRequired,
      genres: PropTypes.arrayOf(
         PropTypes.shape({
            name: PropTypes.string.isRequired,
         })
      ).isRequired,
      description: PropTypes.string.isRequired,
      poster: PropTypes.string.isRequired,
   }).isRequired,
   onMovieClick: PropTypes.func,
};
