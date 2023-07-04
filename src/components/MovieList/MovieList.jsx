import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';
import { List, MovieItem, Image, MovieTitle } from './MovieList.styled';

const MovieList = ({ movies }) => {
  const location = useLocation();
  return (
    <List>
      {movies.map(({ id, poster_path, title, name, original_title }) => {
        return (
          <MovieItem key={id}>
            <Link
              style={{ textDecoration: 'none', textAlign: 'center' }}
              to={`/movies/${id}`}
              state={{ from: location }}
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
              <MovieTitle>{title || name || original_title}</MovieTitle>
            </Link>
          </MovieItem>
        );
      })}
    </List>
  );
};

MovieList.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      poster_path: PropTypes.string,
      title: PropTypes.string,
      name: PropTypes.string,
      original_title: PropTypes.string,
    }).isRequired
  ),
};

export default MovieList;
