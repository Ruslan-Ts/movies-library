import { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from 'components/Loader/Loader';
import MovieList from 'components/MovieList/MovieList';

const Home = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const fetchFoo = async () => {
      try {
        const {
          data: { results },
        } = await axios.get(
          'https://api.themoviedb.org/3/trending/movie/week?api_key=ac5224eaea5eecab8d1620632b5b6c95'
        );
        const filteredMovies = results.map(({ id, poster_path, title }) => ({
          id,
          poster_path,
          title,
        }));
        setPopularMovies(filteredMovies);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    fetchFoo();
  }, []);

  return (
    <>
      {isLoading && <Loader />}
      {isError && <p>Oops... Something went wrong...</p>}
      {popularMovies.length > 0 && <MovieList movies={popularMovies} />}
    </>
  );
};

export default Home;
