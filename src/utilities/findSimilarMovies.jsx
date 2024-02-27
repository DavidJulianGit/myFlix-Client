export default function findSimilarMovies(movies, inputMovie) {
    // Function to extract genre names from a movie's genre array
    const extractGenreNames = (genres) => genres.map(genre => genre.name);
    
    // Extract genre names from the input movie
    const inputMovieGenres = extractGenreNames(inputMovie.genres);
    
    // Filter movies that have at least two genres in common with the input movie
    return movies.filter(movie => {
       // Extract genre names for the current movie
       const movieGenres = extractGenreNames(movie.genres);
    
       // Count how many genres are in common
       const commonGenresCount = movieGenres.reduce((count, genreName) => {
          return inputMovieGenres.includes(genreName) && inputMovie.title !== movie.title ? count + 1 : count;
       }, 0);
    
       // Return true if there are at least two genres in common, false otherwise
       return commonGenresCount >= 2;
    });
}