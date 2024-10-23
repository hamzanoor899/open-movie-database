import React from 'react';

const MovieCard = ({ movie }) => {
  return (
    <div className="card p-2" style={{ cursor: 'pointer', height: '100%', border: '1px solid #000', borderRadius: '10px'  }}>
      <img src={movie?.Poster} alt={movie?.Title} className="card-img-top" />
      <div className="card-body bg-dark rounded-botom">
        <h6 className="card-title text-white">{movie?.Title}</h6>
        <p className="card-text text-white">{movie?.Year}</p>
      </div>
    </div>
  );
};

export default MovieCard;
