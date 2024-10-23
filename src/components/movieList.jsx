import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import MovieCard from './movieCards';
import { setMovie, deleteMovie } from '../store/slices/movieSlice';
import MovieSearch from './movieSearch';
import Banner from './banner';

const MovieList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const movies = useSelector((state) => state.movies.movie);
  const addMovies = useSelector((state) => state.movies.addMovies);
  const status = useSelector((state) => state.movies.status);
  const error = useSelector((state) => state.movies.error);

  const [searchQuery, setSearchQuery] = useState('');
  const [errorLocal, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchMovies = async (query = '', page = 1) => {
    setLoading(true);
    setError(null);
    const API_KEY = '2d987e8f';
    // const API_KEY = 'c0807c41';
    const url = query
      ? `http://www.omdbapi.com/?s=${query}&apikey=${API_KEY}&page=${page}`
      : `http://www.omdbapi.com/?s=james&apikey=${API_KEY}&page=${page}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.Response === 'True') {
        return data.Search;
      } else {
        setError(data.Error);
        return [];
      }
    } catch (err) {
      setError('Failed to fetch data.');
      return [];
    } finally {
      setLoading(false);
    }
  };

  const fetchDefaultMovies = async () => {
    const moviesPage1 = await fetchMovies('', 1);
    const moviesPage2 = await fetchMovies('', 2);
    const moviesPage3 = await fetchMovies('', 3);
    const moviesPage4 = await fetchMovies('', 4);
    dispatch(setMovie([...moviesPage1, ...moviesPage2, ...moviesPage3, ...moviesPage4]));
  };

  useEffect(() => {
    fetchDefaultMovies();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    const searchResultsPage1 = await fetchMovies(searchQuery, 1);
    const searchResultsPage2 = await fetchMovies(searchQuery, 2);
    const searchResultsPage3 = await fetchMovies(searchQuery, 3);
    dispatch(setMovie([...searchResultsPage1, ...searchResultsPage2, ...searchResultsPage3]));
  };

  const combinedMovies = [...addMovies, ...movies];

  return (
    <div>
      <Banner />
      <div className='bg-dark py-3'>
        <MovieSearch submit={handleSearch} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      </div>

      <div className='container my-4'>
        <div className='d-flex justify-content-between mb-4'>
          <h3>Popular Movies</h3>
          <button
            onClick={() => navigate('/movie/add')}
            className='border-0 bg-primary text-white rounded-pill px-4'
          >Add Movie</button>
        </div>
        <div className='row'>
          {status === 'loading' && <p>Loading...</p>}
          {status === 'failed' && <p>Error: {error}</p>}
          {combinedMovies &&
            combinedMovies?.length > 0 &&
            combinedMovies?.map((movie) => {
              return (
                <div className='col-md-3 mb-5' key={movie.imdbID}>
                  <Link to={`/movie/${movie.imdbID}`} className='text-decoration-none'>
                    <MovieCard movie={movie} />
                  </Link>
                  <div className='d-flex justify-content-end gap-2 my-2'>
                    <button
                      onClick={() => navigate(`/movie/edit/${movie.imdbID}`)}
                      className='border-0 bg-warning text-white rounded-pill px-3'
                    >Edit</button>
                    <button
                      onClick={() => dispatch(deleteMovie(movie.imdbID))}
                      className='border-0 bg-danger text-white rounded-pill px-3'
                    >Delete</button>
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  );
};

export default MovieList;
