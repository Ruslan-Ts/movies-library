import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import axios from 'axios';
import Notiflix from 'notiflix';

const Movies = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [foundedMovies, setFoundedMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const queryFromSearchParams = searchParams.get('query');

  useEffect(() => {
    if (queryFromSearchParams === null) {
      return;
    }
    const fetchFoo = async searchWord => {
      try {
        const {
          data: { results },
        } = await axios.get(
          `https://api.themoviedb.org/3/search/movie?query=${queryFromSearchParams}&api_key=ac5224eaea5eecab8d1620632b5b6c95`
        );
        if (!results.length) {
          Notiflix.Notify.warning('There is no movies');
        }
        const filteredMovies = results.map(({ id, poster_path, title }) => ({
          id,
          poster_path,
          title,
        }));
        setFoundedMovies(filteredMovies);
      } catch (error) {
        console.log(error);
      }
    };
    fetchFoo(queryFromSearchParams);
  }, [queryFromSearchParams, searchParams]);

  const handleSubmit = e => {
    e.preventDefault();

    let value = e.target.elements.search.value;

    setSearchQuery(value.toLowerCase().trim());
    setSearchParams({ query: value.toLowerCase().trim() });

    if (searchQuery.trim() === '') {
      Notiflix.Notify.warning('Type something');
      value = '';
      return;
    }
    setSearchQuery('');
  };

  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <button type="submit">
            <svg
              stroke="#000"
              fill="#000"
              strokeWidth="0"
              viewBox="0 0 448 512"
              height="12px"
              width="12px"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M448 449L301.2 300.2c20-27.9 31.9-62.2 31.9-99.2 0-93.1-74.7-168.9-166.5-168.9C74.7 32 0 107.8 0 200.9s74.7 168.9 166.5 168.9c39.8 0 76.3-14.2 105-37.9l146 148.1 30.5-31zM166.5 330.8c-70.6 0-128.1-58.3-128.1-129.9S95.9 71 166.5 71s128.1 58.3 128.1 129.9-57.4 129.9-128.1 129.9z"></path>
            </svg>
            <div>Search</div>
          </button>

          <input
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            type="text"
            name="search"
            autoComplete="off"
            autoFocus
            placeholder="Search movies"
          />
        </form>
      </div>
      <div>
        <ul>
          {foundedMovies.map(({ id, poster_path, title }) => {
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
      </div>
    </>
  );
};

export default Movies;
