import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Notiflix from 'notiflix';
import Loader from 'components/Loader/Loader';
import { ReviewsList } from './Reviews.styled';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const { movieId } = useParams();

  const normalizedReviews = arr => {
    return arr.map(({ id, content }) => ({
      id,
      content,
    }));
  };

  useEffect(() => {
    setIsLoading(true);
    try {
      const fetchFoo = async movieId => {
        const {
          data: { results },
        } = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=ac5224eaea5eecab8d1620632b5b6c95`
        );

        setReviews(normalizedReviews(results));
      };
      fetchFoo(movieId);
    } catch (error) {
      setIsError(true);
      setReviews({});
    } finally {
      setIsLoading(false);
    }
  }, [movieId]);

  return (
    <>
      {isLoading && <Loader />}
      {isError && Notiflix.Notify.warning('Something went wrong! ')}
      <ReviewsList>
        {reviews.length > 0 ? (
          reviews.map(({ id, content }) => {
            return (
              <li key={id}>
                <p>{content}</p>
              </li>
            );
          })
        ) : (
          <p className="msg">Possibly, there are no reviews</p>
        )}
      </ReviewsList>
    </>
  );
};

export default Reviews;
