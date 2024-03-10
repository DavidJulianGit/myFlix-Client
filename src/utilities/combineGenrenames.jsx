
export default function combineGenreNames(genres) {
   return genres.map((genre) => genre.name).join(', ');
}
