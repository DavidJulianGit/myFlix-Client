import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const APIUrl = 'https://myflix-z30i.onrender.com/movies';

// Async thunk for fetching movies
export const fetchMovies = createAsyncThunk(
   'movies/fetchMovies',
   async (token, { rejectWithValue }) => {
      try {
         const response = await fetch(APIUrl, {
            headers: { Authorization: `Bearer ${token}` },
         });
         if (!response.ok) {
            throw new Error('Failed to fetch movies');
         }
         const data = await response.json();
         return data.map((movie) => ({
            id: movie._id,
            title: movie.title,
            poster: movie.poster,
            director: movie.director.name,
            genres: movie.genres,
            description: movie.description,
         }));
      } catch (error) {
         return rejectWithValue(error.message);
      }
   }
);

const movieSlice = createSlice({
   name: 'movies',
   initialState: {
      data: [],         // Array of movies
      filter: '',       // String for filtering movie array
      status: 'idle',   // 'idle' | 'loading' | 'succeeded' | 'failed'
      error: null,

   },
   reducers: {
      setMovies: (state, action) => {
         state.movies = action.payload;
      },
      setFilter: (state, action) => {
         state.filter = action.payload;
      }
   },
   extraReducers: (builder) => {
      builder
         .addCase(fetchMovies.pending, (state) => {
            state.status = 'loading';
         })
         .addCase(fetchMovies.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.data = action.payload;
         })
         .addCase(fetchMovies.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.payload;
         })
         .addMatcher(
            action => action.type === 'user/clearUser',
            (state) => {
               // Reset the filter when `clearUser` is dispatched / the user is logged out
               state.filter = '';
            }
         );
   },
});

// Exporting reducers and async thunk
export const { setMovies, setFilter } = movieSlice.actions;
export default movieSlice.reducer;
