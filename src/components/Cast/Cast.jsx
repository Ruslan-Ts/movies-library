import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { CastList, CastItem, Image } from './Cast.styled';

const Cast = () => {
  const [cast, setCast] = useState({});
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
    try {
      const fetchFoo = async movieId => {
        const {
          data: { cast },
        } = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=ac5224eaea5eecab8d1620632b5b6c95`
        );

        setCast(normalizedCast(cast));
        console.log(cast);
      };
      fetchFoo(movieId);
    } catch (error) {
      console.log(error.message);
      setCast({});
    }
  }, [movieId]);

  return (
    <CastList>
      {!cast.length ? (
        <p>Oooops!</p>
      ) : (
        cast.map(({ cast_id, character, name, profile_path }) => {
          return (
            <CastItem id={cast_id}>
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
      )}
    </CastList>
  );
};

export default Cast;
