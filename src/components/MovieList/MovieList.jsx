import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Circles } from 'react-loader-spinner';
import Notiflix from 'notiflix';
import { List, MovieItem, Image, MovieTitle } from './MovieList.styled';

const MovieList = ({ isLoading, isError, movies }) => {
  return (
    <List>
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
      {movies.map(({ id, poster_path, title }) => {
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
    </List>
  );
};

MovieList.propTypes = {
  movies: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  isError: PropTypes.bool.isRequired,
};

export default MovieList;
