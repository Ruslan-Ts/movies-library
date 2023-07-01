import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Circles } from 'react-loader-spinner';
import Notiflix from 'notiflix';

import { HomeList, MovieItem, Image, MovieTitle } from './Home.styled';

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
    <HomeList>
      {isLoading && (
        <Circles
          height="80"
          width="80"
          color="blue"
          ariaLabel="circles-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      )}
      {isError && Notiflix.Notify.warning('Something went wrong! ')}
      {popularMovies.map(({ id, poster_path, title }) => {
        return (
          <MovieItem key={id}>
            <Link
              style={{ textDecoration: 'none', textAlign: 'center' }}
              to={`/movies/${id}`}
            >
              <div>
                <Image
                  src={
                    poster_path
                      ? `https://image.tmdb.org/t/p/w500/${poster_path}`
                      : 'https://st2.depositphotos.com/4323461/9818/v/450/depositphotos_98187808-stock-illustration-oops-problem-man-business-concept.jpg}'
                  }
                  alt={title}
                />
              </div>
              <MovieTitle>{title}</MovieTitle>
            </Link>
          </MovieItem>
        );
      })}
    </HomeList>
  );
};

export default Home;
