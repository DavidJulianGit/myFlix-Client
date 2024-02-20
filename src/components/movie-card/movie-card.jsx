export default function MovieCard({ movieData, onMovieClick }) {
   function combineGenreNames(genres) {
      return genres.map((genre) => genre.name).join(', ');
   }
   return (
      <div className="col-lg-4 col-md-6 col-12 mb-3">
         <div className="card h-100 p-0 text-start">
            <img
               onClick={() => onMovieClick(movieData)}
               src={movieData.poster}
               className="card-img-top"
               alt={`Movie poster of ${movieData.title}`}
            />
            <div className="card-body">
               <h4
                  className="card-title"
                  onClick={() => onMovieClick(movieData)}>
                  {movieData.title}
               </h4>
               <p className="card-text overflow-hidden">
                  {movieData.description}
               </p>
            </div>
            <div className="m-3">
               <p className="card-text text-end">
                  {combineGenreNames(movieData.genres)}
               </p>
            </div>
         </div>
      </div>
   );
}
