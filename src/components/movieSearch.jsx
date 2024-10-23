import React from 'react'

const MovieSearch = ({ submit, searchQuery, setSearchQuery }) => {

  return (
    <div className='d-flex justify-content-center'>
      <form onSubmit={submit} className="search-bar d-flex">
        <input
          type="text"
          placeholder="Search by movie title"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="form-control"
        />
        <button type="submit" className="btn btn-dark">
          <img src='../assets/imgs/search-icon.png' width={20} />
        </button>
      </form>
    </div>
  )
}

export default MovieSearch