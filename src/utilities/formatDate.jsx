// Format date to yyyy-mm-dd
export default function formatDateForInput(dateString) {
   const date = new Date(dateString);
   return new Intl.DateTimeFormat('en-CA').format(date); // YYYY-MM-DD format
}