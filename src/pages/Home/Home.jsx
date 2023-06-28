import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

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
    <ul>
      {popularMovies.map(({ id, poster_path, title }) => {
        return (
          <li key={id}>
            <Link to={`/movies/${id}`}>
              <div>
                <img
                  src={
                    poster_path
                      ? `https://image.tmdb.org/t/p/w500/${poster_path}`
                      : 'https://st2.depositphotos.com/4323461/9818/v/450/depositphotos_98187808-stock-illustration-oops-problem-man-business-concept.jpg}'
                  }
                  alt={title}
                />
              </div>
              <h2>{title}</h2>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default Home;
