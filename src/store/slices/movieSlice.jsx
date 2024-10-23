import { createSlice } from "@reduxjs/toolkit";

const initialStateValues = {
  movie: [],
  addMovies: [],
  status: 'idle',
  error: null,
}

const movieSlice = createSlice({
  name: "movies",
  initialState: initialStateValues,
  reducers: {
    setMovie: (state, action) => {
      // state.movie = action.payload;
      const newMovies = action.payload;
      state.movie = [...state.movie, ...newMovies.filter(movie => 
        !state.movie.some(existing => existing.imdbID === movie.imdbID)
      )];
    },
    addMovie: (state, action) => {
      state.addMovies.push(action.payload);
    },
    deleteMovie: (state, action) => {
      state.movie = state.movie.filter((movie) => movie.imdbID !== action.payload);
      state.addMovies = state.addMovies.filter((movie) => movie.imdbID !== action.payload);
    },
    updateMovie: (state, action) => {
      const { imdbID, updatedMovie } = action.payload;
      const index = state.movie.findIndex((movie) => movie.imdbID === imdbID);
      const addedMovieIndex = state.addMovies.findIndex((movie) => movie.imdbID === imdbID);
      if (index !== -1) {
        state.movie[index] = { ...state.movie[index], ...updatedMovie };
      }
      else if (addedMovieIndex !== -1) {
        state.addMovies[addedMovieIndex] = { ...state.addMovies[addedMovieIndex], ...updatedMovie };
      }
    },
  },
})

export const { setMovie, addMovie, deleteMovie, updateMovie } = movieSlice.actions;
export default movieSlice.reducer;
