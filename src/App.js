import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Header from './components/header';
import MovieList from './components/movieList';
import MovieDetails from './components/movieDetails';
import MovieForm from './components/movieForm';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <div>
        <Header />
        <MovieList />
      </div>
    ),
  },
  {
    path: 'movie/:imdbID',
    element: (
      <div>
        <Header />
        <MovieDetails />
      </div>
    ),
  },
  {
    path: 'movie/add',
    element: (
      <div>
        <Header />
        <MovieForm isEditing={false} />
      </div>
    )
  },
  {
    path: 'movie/edit/:id',
    element: (
      <div>
        <Header />
        <MovieForm isEditing={true} />
      </div>
    )
  },
  {
    path: '*',
    element: <h2>Page Not Found</h2>,
  }
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
