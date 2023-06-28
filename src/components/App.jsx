import { Routes, Route } from 'react-router-dom';
import Layout from './Layout/Layout.jsx';
import Home from '../pages/Home/Home.jsx';
import Movies from '../pages/Movies/Movies.jsx';
import MovieDetails from 'pages/MovieDetails/MovieDetails.jsx';
import Cast from './Cast/Cast.jsx';
import Reviews from './Reviews/Reviews.jsx';

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="movies" element={<Movies />} />
        <Route path="movies/:movieId" element={<MovieDetails />}>
          <Route path="cast" element={<Cast />} />
          <Route path="reviews" element={<Reviews />} />
        </Route>
      </Route>
    </Routes>
  );
};
