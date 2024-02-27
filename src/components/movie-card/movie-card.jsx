import { Col, Card, Badge } from 'react-bootstrap';
import PropTypes from 'prop-types';
import combineGenreNames from '../../utilities/combineGenreNames';
import { Link } from 'react-router-dom';
import { IoStarOutline, IoStar } from "react-icons/io5";


export default function MovieCard({ movie, user, JWT, updateFavorites }) {

   const isFavorite = user && user.favoriteMovies ? user.favoriteMovies.includes(movie.id) : false;

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
            updateFavorites(data);
         })
         .catch((e) => {
            console.error('Error:', e);
            alert('Something went wrong: ' + e.message);
         });


   };

   const favoriteIconStyle = {
      position: 'absolute',
      top: '10px',
      right: '10px',
      cursor: 'pointer',
      zIndex: 1,
   };

   return (
      <Col lg={4} md={6} className="mb-3">
         <Card className="p-0 card text-start">
            <div style={{ position: 'relative' }}>
               <Link to={`/movies/${encodeURIComponent(movie.title)}`}>
                  <Card.Img
                     src={movie.poster}
                     alt={`Movie poster of ${movie.title}`}
                     variant="top"
                  />
               </Link>
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
