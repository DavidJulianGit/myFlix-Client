import PropTypes from 'prop-types';
import combineGenreNames from '../../utilities/combineGenrenames';

export default function MovieView({ movie, onBackClick }) {
   return (
      <div className="container">
         <div className="row g-3">
            <div className="col-sm-6 col-12 pe-5">
               <div className="row">
                  <h1>{movie.title}</h1>
               </div>

               <div className="row align-items-end mt-1">
                  <div className="col-sm-6 col-12">
                     <h4 className="m-0">{movie.director}</h4>
                  </div>
                  <div className="col-sm-6 col-12 movie-view-genres">
                     <p className="m-0">{combineGenreNames(movie.genres)}</p>
                  </div>
               </div>

               <div className="row mt-5">
                  <div className="col">{movie.description}</div>
               </div>
            </div>

            <div className="col-sm-6 col-12">
               <img
                  className="movie-poster rounded"
                  src={movie.poster}
                  alt={`Movie poster of ${movie.title}`}
               />
            </div>
         </div>
         <button
            type="button"
            className="btn btn-warning"
            onClick={onBackClick}>
            Back
         </button>
      </div>
   );
}

MovieView.propTypes = {
   movie: PropTypes.shape({
      title: PropTypes.string.isRequired,
      director: PropTypes.shape({
         name: PropTypes.string.isRequired,
      }).isRequired,
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
