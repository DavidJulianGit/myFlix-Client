import PropTypes from 'prop-types';

/**
 * Combines an array of genre objects into a single string of genre names, separated by commas.
 *
 * @param {Array<Object>} genres - An array of genre objects, where each object has a 'name' property.
 * @returns {string} - A string containing the concatenated genre names separated by commas.
 */
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
