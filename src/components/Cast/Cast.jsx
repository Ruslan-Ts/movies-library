import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Notiflix from 'notiflix';
import Loader from 'components/Loader/Loader';
import { CastList, CastItem, Image } from './Cast.styled';

const Cast = () => {
  const [cast, setCast] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const { movieId } = useParams();
  const normalizedCast = arr => {
    return arr.map(({ cast_id, character, name, profile_path }) => ({
      cast_id,
      character,
      name,
      profile_path,
    }));
  };

  useEffect(() => {
    setIsLoading(true);
    try {
      const fetchFoo = async movieId => {
        const {
          data: { cast },
        } = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=ac5224eaea5eecab8d1620632b5b6c95`
        );

        setCast(normalizedCast(cast));
      };
      fetchFoo(movieId);
    } catch (error) {
      setIsError(true);
      setCast({});
    } finally {
      setIsLoading(false);
    }
  }, [movieId]);

  return (
    <>
      {isLoading && <Loader />}
      {isError && Notiflix.Notify.warning('Something went wrong! ')}
      <CastList>
        {cast.length > 0 ? (
          cast.map(({ cast_id, character, name, profile_path }) => {
            return (
              <CastItem key={cast_id}>
                <Image
                  src={
                    profile_path
                      ? `https://image.tmdb.org/t/p/w500/${profile_path}`
                      : 'https://st2.depositphotos.com/4323461/9818/v/450/depositphotos_98187808-stock-illustration-oops-problem-man-business-concept.jpg}'
                  }
                  alt={name}
                />
                <h2>{name}</h2>
                <p>{character}</p>
              </CastItem>
            );
          })
        ) : (
          <p>Oooops!</p>
        )}
      </CastList>
    </>
  );
};

export default Cast;
