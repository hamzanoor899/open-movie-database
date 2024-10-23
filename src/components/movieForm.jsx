import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addMovie, updateMovie } from '../store/slices/movieSlice';
import { useNavigate, useParams } from 'react-router-dom';

const MovieForm = ({ isEditing }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [year, setYear] = useState('');
  const [imdbID, setImdbID] = useState('');
  const [poster, setPoster] = useState('');

  const movie = useSelector(state =>
    state.movies.movie.find(m => m.imdbID === id)
  );

  useEffect(() => {
    if (isEditing && movie) {
      setTitle(movie.Title);
      setYear(movie.Year);
      setImdbID(movie.imdbID);
      setPoster(movie.Poster);
    } else {
      setTitle('');
      setYear('');
      setImdbID('');
      setPoster('');
    }
  }, [isEditing, movie]);

  const handleSaveClick = () => {
    const movieData = { Title: title, Year: year, imdbID: imdbID, Poster: poster };

    if (isEditing) {
      dispatch(updateMovie({ imdbID, updatedMovie: movieData }));
    } else {
      dispatch(addMovie(movieData));
      console.log(movieData, 'movie data')
    }

    navigate('/');
  };

  return (
    <div className='container'>
      <div>
        <h2>{isEditing ? 'Edit Movie' : 'Add Movie'}</h2>
        <label>Title</label>
        <input
          className="form-control"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <label>Year</label>
        <input
          className="form-control"
          name="year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />
      </div>
      <div>
        <label>IMDB ID</label>
        <input
          className="form-control"
          name="imdbID"
          value={imdbID}
          onChange={(e) => setImdbID(e.target.value)}
        />
      </div>
      <div>
        <label>Poster URL</label>
        <input
          className="form-control"
          name="poster"
          value={poster}
          onChange={(e) => setPoster(e.target.value)}
        />
      </div>
      <button onClick={handleSaveClick} className="btn btn-primary mt-3">
        {isEditing ? 'Update Movie' : 'Add Movie'}
      </button>
    </div>
  );
};

export default MovieForm;
