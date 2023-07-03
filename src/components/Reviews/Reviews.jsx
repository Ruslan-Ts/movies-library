import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Notiflix from 'notiflix';
import { Circles } from 'react-loader-spinner';
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
      <ReviewsList>
        {!reviews.length ? (
          <p className="msg">Possibly, there are no reviews</p>
        ) : (
          reviews.map(({ id, content }) => {
            return (
              <li key={id}>
                <p>{content}</p>
              </li>
            );
          })
        )}
      </ReviewsList>
    </>
  );
};

export default Reviews;
