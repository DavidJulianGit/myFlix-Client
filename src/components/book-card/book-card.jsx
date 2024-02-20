export default function BookCard({ bookData, onBookClick }) {
   return <div onClick={() => onBookClick(bookData)}>{bookData.title}</div>;
}
