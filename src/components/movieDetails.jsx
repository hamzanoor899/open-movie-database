import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const MovieDetails = () => {
  const { imdbID } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const API_KEY = '2d987e8f';
  // const API_KEY = 'c0807c41';

  useEffect(() => {
    const fetchMovieDetails = async () => {
      const response = await fetch(`http://www.omdbapi.com/?i=${imdbID}&apikey=${API_KEY}`);
      const data = await response.json();
      setMovieDetails(data);
    };

    fetchMovieDetails();
  }, [imdbID]);

  let rating = movieDetails?.rating ? movieDetails?.rating * 10 : 60.4;
   rating = isNaN(rating) ? 0 : rating;

  if (!movieDetails) return <div>Loading...</div>;

  return (
    <div className='banner-img-2 p-5'>
      <div className='overlay'></div>
      <div className="container my-5">
        <div className='row'>
          <div className='col d-flex justify-content-center justify-content-sm-center'>
            <img src={movieDetails.Poster} alt={movieDetails.Title} />
          </div>
          <div className='col d-flex flex-column flex-sm-column align-items-center align-items-sm-start justify-content-center justify-content-sm-center'>
            <h3>{movieDetails.Title}</h3>
            <p><strong>Plot:</strong> {movieDetails.Plot}</p>
            <p className='m-0'><strong>Vote:</strong> {movieDetails.imdbVotes}</p>
            <p className='m-0'><strong>Genre:</strong> {movieDetails.Genre}</p>
            <div className="rating d-flex justify-conttent-between align-items-center">
              <p>Rating</p> &nbsp;
              <meter
                min="0"
                max="100"
                optimum="100"
                low="0"
                high="100"
                value={rating}
                className='m-0'
              />
              &nbsp;
              <p className="score">{`${rating}%`}</p>
            </div>
            <p className='border w-100'></p>
            <p className='m-0'><strong>Actors:</strong> {movieDetails.Actors}</p>
            <p className='m-0'><strong>Director(s):</strong> {movieDetails.Director}</p>
            <p className='m-0'><strong>Writer(s):</strong> {movieDetails.Writer}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
