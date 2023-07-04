import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import Notiflix from 'notiflix';
import Loader from 'components/Loader/Loader';
import { SearchForm, SearchFormInput, Btn, BtnText } from './Movies.styled';
import MovieList from 'components/MovieList/MovieList.jsx';

const Movies = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [foundedMovies, setFoundedMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const queryFromSearchParams = searchParams.get('query');

  useEffect(() => {
    if (queryFromSearchParams === null) {
      return;
    }
    setIsLoading(true);
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
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    fetchFoo(queryFromSearchParams);
  }, [queryFromSearchParams, searchParams]);

  const handleChange = e => {
    setSearchQuery(e.target.value.toLowerCase().trim());
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (!searchQuery) {
      return Notiflix.Notify.warning('Type something');
    }
    setSearchParams({ query: searchQuery });
    setSearchQuery('');
  };

  return (
    <>
      <div>
        <SearchForm onSubmit={handleSubmit}>
          <Btn type="submit">
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
            <BtnText>Search</BtnText>
          </Btn>

          <SearchFormInput
            value={searchQuery}
            onChange={handleChange}
            type="text"
            name="search"
            autoComplete="off"
            autoFocus
            placeholder="Search movies"
          />
        </SearchForm>
      </div>
      <div>
        {isLoading && <Loader />}
        {isError && <p>Oops... Something went wrong...</p>}
        {foundedMovies.length > 0 && <MovieList movies={foundedMovies} />}
      </div>
    </>
  );
};

export default Movies;
