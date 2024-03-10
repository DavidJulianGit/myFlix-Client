
export default function combineGenreNames(genres) {
   return genres.map((genre) => genre.name).join(', ');
}

combineGenreNames.PropTypes = {
   genres: PropTypes.arrayOf(
      PropTypes.shape({
         name: PropTypes.string.isRequired,
      })
   ).isRequired,
};
