import PropTypes from 'prop-types';

import combineGenreNames from '../../utilities/combineGenreNames';

export default function MovieView({ movie, onBackClick }) {
   return (
      <div className="container">
         <div className="row">
            <div className="col-md-6 p-3">
               <h1>{movie.title}</h1>
               <div className="container d-lg-flex flex-lg-row flex-column justify-content-between p-0">
                  <div className="item">
                     <h4 className="mb-0">{movie.director}</h4>
                  </div>
                  <div className="item">
                     <p className="mb-0 ">{combineGenreNames(movie.genres)}</p>
                  </div>
               </div>
               <p className="my-5">{movie.description}</p>
               <button
                  type="button"
                  className="btn btn-warning"
                  onClick={onBackClick}>
                  Back
               </button>
            </div>
            <div className="col-md-6 p-3 d-flex justify-content-center justify-content-md-end align-items-center">
               <img
                  className="rounded movie-poster"
                  src={movie.poster}
                  alt={`Poster of the movie  ${movie.title}`}
               />
            </div>
         </div>
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
