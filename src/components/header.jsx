import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {

  return (
    <nav className="navbar navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center gap-2" to={'/'}>
          <img src="../assets/imgs/omdb__movie_icon.png"
            width="50"
            alt="OMDB Movies"
          />
          <h4 className='m-0'>OMDB Movies</h4>
        </Link>
      </div>
    </nav>
  );
};

export default Header;
