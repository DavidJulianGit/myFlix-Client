export default function MovieView({ movie, onBackClick }) {
   /**
    * Combines an array of genre objects into a single string of genre names, separated by commas.
    *
    * @param {Array<Object>} genres - An array of genre objects, where each object has a 'name' property.
    * @returns {string} - A string containing the concatenated genre names separated by commas.
    */
   function combineGenreNames(genres) {
      return genres.map((genre) => genre.name).join(', ');
   }

   return (
      <div className="container">
         <div className="row g-3">
            <div className="col-sm-6 col-12 pe-5">
               <div className="row">
                  <h1>{movie.title}</h1>
               </div>

               <div className="row align-items-end mt-1">
                  <div className="col-sm-6 col-12">
                     <h4 className="m-0">{movie.director.name}</h4>
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
