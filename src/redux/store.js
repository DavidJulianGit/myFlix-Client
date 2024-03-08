import { configureStore } from '@reduxjs/toolkit';
import movieReducer from './Slices/movies';
import userReducer from './Slices/user';

export const store = configureStore({
   reducer: { movies: movieReducer, user: userReducer }
});