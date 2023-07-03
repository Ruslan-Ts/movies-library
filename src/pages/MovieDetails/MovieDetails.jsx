import { useState, useEffect, Suspense, useRef } from 'react';
import { useParams, Outlet, useLocation } from 'react-router-dom';
import axios from 'axios';
import { Circles } from 'react-loader-spinner';
import { StyledLink, MovieContainer, Image } from './MovieDetails.styled';
import { PiArrowCounterClockwiseBold } from 'react-icons/pi';
import Notiflix from 'notiflix';

const MovieDetails = () => {
  const [movieInfo, setMovieInfo] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const { movieId } = useParams();
  const location = useLocation();
  const pathBack = useRef(location.state?.from ?? '/');

  useEffect(() => {
    setIsLoading(true);
    try {
      const fetchFoo = async movieId => {
        const { data } = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}?api_key=ac5224eaea5eecab8d1620632b5b6c95`
        );

        setMovieInfo(data);
      };
      fetchFoo(movieId);
    } catch (error) {
      setIsError(true);
      setMovieInfo({});
    } finally {
      setIsLoading(false);
    }
  }, [movieId]);

  return (
    <div>
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
      <StyledLink to={pathBack.current}>
        <PiArrowCounterClockwiseBold /> Back
      </StyledLink>
      <MovieContainer>
        <div>
          <Image
            src={
              movieInfo.poster_path
                ? `https://image.tmdb.org/t/p/w500/${movieInfo.poster_path}`
                : 'https://st2.depositphotos.com/4323461/9818/v/450/depositphotos_98187808-stock-illustration-oops-problem-man-business-concept.jpg}'
            }
            alt={movieInfo.title}
          />
        </div>
        <div>
          <h2>{movieInfo.title}</h2>
          <p>Release: {movieInfo.release_date}</p>
          <h3>Rating: {movieInfo.vote_average}</h3>
          <h3>Genre: </h3>
          {movieInfo.genres &&
            movieInfo.genres.map(({ name, id }) => {
              return <span key={id}>{name}, </span>;
            })}
          <p style={{ maxWidth: '600px' }}>{movieInfo.overview}</p>
          <ul
            style={{
              listStyle: 'none',
              display: 'flex',
            }}
          >
            {movieInfo.production_companies &&
              movieInfo.production_companies.map(({ logo_path, name, id }) => {
                return (
                  <li key={id}>
                    <div>
                      <img
                        style={{
                          height: '30px',
                          width: 'auto',
                          margin: '10px',
                          listStyle: 'none',
                        }}
                        src={
                          logo_path
                            ? `https://image.tmdb.org/t/p/w500/${logo_path}`
                            : 'https://st2.depositphotos.com/4323461/9818/v/450/depositphotos_98187808-stock-illustration-oops-problem-man-business-concept.jpg}'
                        }
                        alt={name}
                      />
                    </div>
                  </li>
                );
              })}
          </ul>
        </div>
      </MovieContainer>
      <div>
        <StyledLink to={movieInfo.homepage}>Movie Homepage</StyledLink>
        <StyledLink to="cast">Cast</StyledLink>
        <StyledLink to="reviews">Reviews</StyledLink>
      </div>
      <Suspense
        fallback={
          <div>
            <Circles
              height="80"
              width="80"
              color="blue"
              ariaLabel="circles-loading"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
          </div>
        }
      >
        <Outlet />
      </Suspense>
    </div>
  );
};

export default MovieDetails;
