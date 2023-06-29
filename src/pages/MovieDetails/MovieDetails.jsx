import { useState, useEffect, Suspense } from 'react';
import { useParams, Outlet } from 'react-router-dom';
import axios from 'axios';
import { Circles } from 'react-loader-spinner';
import { StyledLink, MovieContainer, Image } from './MovieDetails.styled';

const MovieDetails = () => {
  const [movieInfo, setMovieInfo] = useState({});
  const { movieId } = useParams();

  useEffect(() => {
    try {
      const fetchFoo = async movieId => {
        const { data } = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}?api_key=ac5224eaea5eecab8d1620632b5b6c95`
        );

        setMovieInfo(data);
        console.log(data);
      };
      fetchFoo(movieId);
    } catch (error) {
      console.log(error.message);
      setMovieInfo({});
    }
  }, [movieId]);

  return (
    <div>
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
          <h2>Title: {movieInfo.title}</h2>
          <p>Release: {movieInfo.release_date}</p>
          <h3>Rating: {movieInfo.vote_average}</h3>
          {/* <h3>Genre: </h3>
      {!movieInfo.length ? (
        <p>Oooooops!</p>
      ) : (
        movieInfo.genres.map(({ name, id }) => {
          return <span id={id}>{name} </span>;
        })
      )} */}
          <p style={{ maxWidth: '600px' }}>{movieInfo.overview}</p>
          {/* <ul>
        {!movieInfo.length ? (
          <p>Oooooops!</p>
        ) : (
          movieInfo.production_companies.map(({ logo_path, name, id }) => {
            return (
              <li key={id}>
                <div>
                  <img
                    style={{
                      height: '30px',
                      width: 'auto',
                      margin: '10px',
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
          })
        )}
      </ul> */}
        </div>
      </MovieContainer>
      <div>
        <StyledLink to={movieInfo.homepage}>Homepage</StyledLink>
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
