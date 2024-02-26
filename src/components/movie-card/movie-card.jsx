import { Col, Card } from 'react-bootstrap';

import PropTypes from 'prop-types';
import combineGenreNames from '../../utilities/combineGenreNames';
import { Link } from 'react-router-dom';

export default function MovieCard({ movie }) {
   return (
      <Col lg={4} md={6} className="mb-3">
         <Card className="p-0 card text-start">
            <Link to={`/movies/${encodeURIComponent(movie.title)}`}>
               <Card.Img
                  src={movie.poster}
                  alt={`Movie poster of ${movie.title}`}
                  variant="top"
               />
            </Link>
            <Card.Body className='p-2'>
               <Card.Title className='mb-1'>
                  <Link to={`/movies/${encodeURIComponent(movie.id)}`} className='link'>
                     {movie.title}
                  </Link>
               </Card.Title>
               <Card.Text className="card-text">
                  {movie.description}
               </Card.Text>
            </Card.Body>
            <Card.Footer className="text-end p-2">
               <small className="text-muted">
                  {combineGenreNames(movie.genres)}
               </small>
            </Card.Footer>
         </Card>
      </Col >
   );
}
MovieCard.propTypes = {
   movie: PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      genres: PropTypes.arrayOf(
         PropTypes.shape({
            name: PropTypes.string.isRequired,
         })
      ).isRequired,
      description: PropTypes.string.isRequired,
      poster: PropTypes.string.isRequired,
   }).isRequired,
};
