import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { HomeList, MovieItem, Image, MovieTitle } from './Home.styled';

const Home = () => {
  const [popularMovies, setPopularMovies] = useState([]);

  useEffect(() => {
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
        console.log(error);
      }
    };
    fetchFoo();
  }, []);

  return (
    <HomeList>
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
